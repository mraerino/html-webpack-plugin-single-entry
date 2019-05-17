import { Compiler, compilation } from 'webpack';
import { AsyncSeriesWaterfallHook } from 'tapable';

declare module 'html-webpack-plugin' {
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

    interface Hooks {
        beforeAssetTagGeneration: AsyncSeriesWaterfallHook<BeforeAssetTagGenerationHookData>
    }

    export function getHooks(compilation: compilation.Compilation): Hooks
}
