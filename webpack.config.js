'use strict';

const PROFILE = process.env.NODE_ENV || 'development';
const USER = process.env.USER || 'anonimous';
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        home: "./home",
        about: "./about"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
        library: "[name]"
    },
    watch: PROFILE === 'development',
    devtool: "source-map",
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            PROFILE: JSON.stringify(PROFILE),
            USER: JSON.stringify(USER)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        })
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
};

if (PROFILE === 'production') {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }));
}