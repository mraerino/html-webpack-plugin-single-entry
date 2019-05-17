import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler, compilation } from 'webpack';
interface BeforeAssetTagGenerationHookData {
    assets: {
        publicPath: string;
        js: string[];
        css: string[];
        favicon?: string;
        manifest?: string;
    };
    outputName: string;
    plugin: HtmlWebpackPlugin;
}
interface PluginOpts {
    filename?: string;
    entry: string | Array<string>;
}
declare class HtmlWebpackPluginSingleEntry {
    opts: PluginOpts;
    constructor(opts: PluginOpts);
    apply(compiler: Compiler): void;
    compilation: (compilation: compilation.Compilation) => void;
    beforeAssetTagGeneration: (compilation: compilation.Compilation) => (data: BeforeAssetTagGenerationHookData) => BeforeAssetTagGenerationHookData;
    getFiles(compilation: compilation.Compilation): any[];
}
export default HtmlWebpackPluginSingleEntry;
