const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {    // 包含main和vendors两个入口
        main: ['babel-polyfill', './src/main'], // main编译产出包含babel-polyfill和src/main.js为入口的依赖图
        vendors: ['babel-polyfill', './src/vendors'], // vendors编译产出包含babel-polyfill和src/vendor.js为入口的依赖图，vendors经常用于保存静态库比如jquery、bootstrap之类的
    },
    output: {
        path: path.join(__dirname, './public/dist')
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({   // 处理<style lang="less">块
                                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader',
                                }),
                                css: ExtractTextPlugin.extract({    // 处理<style lang="css">块
                                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader',
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader', // iView UI的loader
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude:  /node_modules\/(?!babel-runtime)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: [require('babel-plugin-async-to-promises'), require('babel-plugin-transform-runtime')]
                    }
                }],
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader','less-loader'],
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|otf|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {  // 配置import的路径解析
        extensions: ['.js', '.vue', 'less', 'css'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
            '@assets': path.resolve('src/assets')
        },
    }
};