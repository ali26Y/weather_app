'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const root = path.join(__dirname, '/../src');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3020',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(process.cwd(), 'app/index.js')
    ],
    cache: true,
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        // extracts the css from the js files and puts them on a separate .css file. this is for
        // performance and is used in prod environments. Styles load faster on their own .css
        // file as they dont have to wait for the JS to load.
        // new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass'
            },
            { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' },
            {
              test: /\.css$/,
              exclude: [
                /node_modules/,
                /styles/
              ],
              loader: 'style-loader'
            },
            {
              test: /\.css$/,
              exclude: [
                /node_modules/,
                /styles/
              ],
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              test: /\.css$/,
              include: [
                /node_modules/,
                /styles/
              ],
              loaders: [ 'style-loader', 'css-loader']
            },
        ]
    }
};
