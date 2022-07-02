const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
    mode: process.env.NODE_ENV,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: "bundle.js"
        
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    
    devServer: {
        static: {
            publicPath: '/',
            directory: path.resolve(__dirname, './public')
        },
        proxy: {
            '/api': 'http://localhost:3000'
        },
        // host: 'localhost',
        // port: 8080

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}