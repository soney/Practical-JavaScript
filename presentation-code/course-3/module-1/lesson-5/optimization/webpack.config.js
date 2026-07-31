const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    externals: {
        lodash: '_',
    }
}