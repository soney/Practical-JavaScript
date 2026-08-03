// webpack builds src/client.js, plus everything it imports, into dist/,
// and copies src/index.html in with a script tag for the bundle added.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client.js',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
