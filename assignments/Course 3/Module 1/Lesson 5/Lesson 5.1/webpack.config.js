// This webpack config is complete except for one field.
// Your task: give `output` a `filename` so webpack writes the bundle to
// dist/bundle.js. See Lesson 5.1/problem-description for details.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: the first file webpack reads. It follows every `import` from here.
  entry: './src/index.js',
  output: {
    // TODO: Add a `filename` property set to 'bundle.js' so webpack writes
    //       the bundle to dist/bundle.js.
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // HtmlWebpackPlugin (provided) generates dist/index.html and adds a <script>
  // tag that loads whatever file `output.filename` produces.
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
