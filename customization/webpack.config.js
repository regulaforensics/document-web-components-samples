const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.js',
    performance: {
        hints: false,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My app',
            template: './index.html',
            inject: 'body',
        }),
    ]
};
