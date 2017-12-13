const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/rst2html.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rst2html.min.js',
    libraryTarget: 'umd',
    library: 'rst2html'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
