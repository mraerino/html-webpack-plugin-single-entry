import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import HTMLWebpackPluginSingleEntry from '../../';

export default {
    entry: {
        main: path.resolve(__dirname, './index.js'),
        other: path.resolve(__dirname, './other.js'),
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js',
    },
    plugins: [
        new HTMLWebpackPlugin(),
        new HTMLWebpackPluginSingleEntry({
            entry: 'main',
        }),
    ],
};
