const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // SOLUTION: 'source-map' makes webpack emit dist/main.js.map.
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
