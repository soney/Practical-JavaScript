// This webpack config bundles a small app. The entry, output, and
// HtmlWebpackPlugin are all provided.
// Your task: add a `devtool` option so webpack also writes a source map
// (dist/main.js.map). See Lesson 5.3/problem-description for details.
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
  // TODO: Add a `devtool` property set to 'source-map' so webpack writes a
  //       source map file (dist/main.js.map) next to the bundle.
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
