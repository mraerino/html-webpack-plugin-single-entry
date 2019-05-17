import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler, compilation } from 'webpack';
import { SyncWaterfallHook } from 'tapable';

const PLUGIN = 'HtmlWebpackPluginSingleEntry';

interface BeforeAssetTagGenerationHookData {
    assets: {
        publicPath: string,
        js: string[],
        css: string[],
        favicon?: string,
        manifest?: string,
    }
    outputName: string
    plugin: HtmlWebpackPlugin
}

interface HtmlWebpackPluginHooks extends compilation.CompilationHooks {
    htmlWebpackPluginAlterChunks: SyncWaterfallHook<compilation.Chunk[]>
}

interface PluginOpts {
    filename?: string
    entry: string | Array<string>
}

class HtmlWebpackPluginSingleEntry {
    opts: PluginOpts;

    constructor(opts: PluginOpts) {
        this.opts = opts;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap(PLUGIN, this.compilation);
    }

    compilation = (compilation: compilation.Compilation) => {
        if (HtmlWebpackPlugin.getHooks) {
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap(PLUGIN, this.beforeAssetTagGeneration(compilation));
        } else {
            throw new Error('html-webpack-plugin before v4 is not supported');
        }
    }

    beforeAssetTagGeneration = (compilation: compilation.Compilation) => (data: BeforeAssetTagGenerationHookData): BeforeAssetTagGenerationHookData => {
        if (this.opts.filename && data.outputName !== this.opts.filename) {
            return data;
        }

        const files = this.getFiles(compilation);
        const validJs = data.assets.js.filter(file => files.includes(file));
        return {
            ...data,
            assets: {
                ...data.assets,
                js: validJs,
            }
        };
    }

    getFiles(compilation: compilation.Compilation) {
        const entries = this.opts.entry instanceof Array ? this.opts.entry : [this.opts.entry];
        const groups = entries.map(entry => compilation.namedChunkGroups.get(entry));
        const files = groups.flatMap(group => group.getFiles().filter((file: string) => !file.endsWith('.map')));
        return files;
    }
}

export default HtmlWebpackPluginSingleEntry;
