# Entry filter plugin for `html-webpack-plugin`

This plugin filters chunks included in the html file generated by `html-webpack-plugin` by the name of an entry.

## Install

```sh
npm install --save-dev html-webpack-plugin-single-entry
```

## Use

`webpack.config.js`

```js
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginSingleEntry = require('html-webpack-plugin-single-entry');

module.exports = {
    entry: {
        main: './main.js',
        other: './other.js',
    }
    ...
    plugins: [
        new HTMLWebpackPlugin(),
        new HTMLWebpackPluginSingleEntry({
            entry: 'main',
        }),
    ],
    ...
}
```

This example will only include the chunks required by the `main` entrypoint into the html file.

### Use with multiple index files

`webpack.config.js`

```js
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginSingleEntry = require('html-webpack-plugin-single-entry');

module.exports = {
    entry: {
        main: './main.js',
        second: './second.js',
        other: './other.js',
    }
    ...
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'main.html',
        }),
        new HTMLWebpackPluginSingleEntry({
            filename: 'main.html',
            entry: 'main',
        }),
        new HTMLWebpackPlugin({
            filename: 'second.html',
        }),
        new HTMLWebpackPluginSingleEntry({
            filename: 'second.html',
            entry: 'second',
        }),
    ],
    ...
}
```

This example will include the respective assets in the selected html files.
