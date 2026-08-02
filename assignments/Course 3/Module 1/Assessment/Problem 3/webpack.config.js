// Provided webpack config. You do not need to edit this file.
//
// It bundles `src/index.js` and every module it imports (including the
// installed lodash library) into `dist/main.js`, and generates `dist/index.html`
// from `src/index.html` with the bundle injected.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
