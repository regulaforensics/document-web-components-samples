const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './index.js', // main application
        delegate: './delegate.js'
    },
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
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Main App',
            template: './index.html',
            filename: 'index.html',
            chunks: ['main'],
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            title: 'Delegate Page',
            template: './delegatePage.html',
            filename: 'delegatePage.html',
            chunks: ['delegate'],
            inject: 'body',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 9000,
    },
};
