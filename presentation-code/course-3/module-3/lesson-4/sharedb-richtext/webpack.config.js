const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/client.js",
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}