// This webpack config bundles a small app that imports a CSS file. The entry,
// output, HtmlWebpackPlugin, and the CSS loader rule are all provided.
// Your task: change `mode` from 'development' to 'production'. See
// Lesson 5.2/problem-description for details.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // TODO: Change `mode` to 'production' so webpack minifies the bundle.
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  // The CSS loader rule is provided so `import './styles.css'` works.
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
    ],
  },
};
