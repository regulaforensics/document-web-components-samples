const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.tsx',
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
                test: /\.(ts|js)x?$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript', '@babel/preset-react'],
                    }
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
