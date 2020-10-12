const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.writeFileSync('./src/config/env.js', 'export default "development";');

module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: './../test.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify('development')
        }),
    ],
    devServer: {
        // 可访问前端的域名
        allowedHosts: [
          'test.com'
        ],
        // 接口代理
        proxy: [
            {
                context: ['/venus'],
                target: 'http://test.com:9000',
                secure: false,
                changeOrigin: true,
                headers: {
                    host: 'http://test.com:9000',
                    origins: 'http://test.com:9000',
                },
            }
        ]
    }
});