const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/app.min.js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false,
          drop_console: true,
          pure_funcs: ['console.log'],
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
          ascii_only: true,
        },
      },
    })] : []),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(__dirname, './components'),
      models: path.join(__dirname, './models'),
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
