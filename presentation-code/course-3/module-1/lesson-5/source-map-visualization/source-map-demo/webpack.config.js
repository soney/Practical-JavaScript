const path = require('path');

module.exports = [
  {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'source-map',
  },
  {
    entry: './index.js',
    output: {
      filename: 'bundle.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    devtool: 'source-map',
  }
];
