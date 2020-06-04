const path = require('path');
require("babel-core/register");
require("babel-polyfill");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');



module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|svg|jpg|gif|)$/, use: ['file-loader'] },
            { test: /\.(woff|woff2|eot|ttf|otf|ico)$/, use: ['file-loader'] },
            {
                test: /\.js/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ["@babel/preset-env"] }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }), new CleanWebpackPlugin(),
        new CopyPlugin([{ from: './src/assets', to: './assets' }])

    ]
};