const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/rst2html.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rst2html.min.js',
    libraryTarget: 'umd',
    library: 'rst2html'
  },
  module: {
    rules: [
      {
        test: /\.(js?)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
