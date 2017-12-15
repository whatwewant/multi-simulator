const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const OfflinePlugin = require('offline-plugin');
// const pkg = require('./package.json');

module.exports = {
  entry: {
    app: './src/index',
    // vendor: Object.keys(pkg.dependencies),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/[name].[hash:8].min.js',
    chunkFilename: 'static/[name].[chunkhash].chunk.js',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'verdor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') > -1 &&
        resource.match(/\.js$/)
      ),
      // children: true,
      // minChunks: 2,
      // async: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...(!!process.env.ANALYZE ? [new Visualizer()] : []),
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
    }), new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      AppCache: false,
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
  },
  devServer: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
};
