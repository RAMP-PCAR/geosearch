const path = require('path');
const webpack       = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const env = {};

const config = {
    entry: {
        'geosearch-polyd': ['babel-polyfill', './src/index.ts'],
        'geosearch': './src/index.ts'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-2'], cacheDirectory: true }
            }, {
                loader: 'ts-loader'
            }]
        }]
    },

    devtool: 'source-map',

    plugins: [

        new WebpackShellPlugin({
            onBuildEnd: [`cp -rf ${path.resolve(__dirname, 'dist')} ${path.resolve(__dirname, 'docs')}`]
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8 : true
            },
            mangle: false,
            sourceMap: true
        })
    ],

    resolve: {
        extensions: ['.ts', '.js' ]
    }
};

module.exports = function(env = {}) {
    return config;
}