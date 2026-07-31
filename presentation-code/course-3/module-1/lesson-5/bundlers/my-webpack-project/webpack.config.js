const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [ new HTMLWebpackPlugin({
        template: './src/index.html',
        title: "Specified within webpack config!"
    }) ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'production'
};