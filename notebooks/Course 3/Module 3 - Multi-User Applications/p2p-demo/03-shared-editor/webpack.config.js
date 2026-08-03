// webpack builds src/editor.js, plus everything it imports (Quill, Yjs,
// y-webrtc, y-quill), into dist/, and copies src/index.html in with a
// script tag for the bundle added. This is the setup from Module 1's
// bundler lessons.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/editor.js',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
