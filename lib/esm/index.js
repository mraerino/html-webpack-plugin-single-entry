import HtmlWebpackPlugin from 'html-webpack-plugin';
const PLUGIN = 'HtmlWebpackPluginSingleEntry';
class HtmlWebpackPluginSingleEntry {
    constructor(opts) {
        this.compilation = (compilation) => {
            if (HtmlWebpackPlugin.getHooks) {
                HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap(PLUGIN, this.beforeAssetTagGeneration(compilation));
            }
            else {
                throw new Error('html-webpack-plugin before v4 is not supported');
            }
        };
        this.beforeAssetTagGeneration = (compilation) => (data) => {
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
        };
        this.opts = opts;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN, this.compilation);
    }
    getFiles(compilation) {
        const entries = this.opts.entry instanceof Array ? this.opts.entry : [this.opts.entry];
        const groups = entries.map(entry => compilation.namedChunkGroups.get(entry));
        const files = groups.flatMap(group => group.getFiles().filter((file) => !file.endsWith('.map')));
        return files;
    }
}
export default HtmlWebpackPluginSingleEntry;
