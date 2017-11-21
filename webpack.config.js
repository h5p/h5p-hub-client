const webpack = require('webpack');
const path = require('path');
const isDevMode = JSON.parse(process.env.DEV_ENV || 0) == 1;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "h5p-hub-client.css"
});

const polyfillPromise = new webpack.ProvidePlugin({
  'Promise': 'es6-promise',
});

const config = {
  entry: "./src/entries/dist.js",
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "h5p-hub-client.js",
    sourceMapFilename: '[file].map'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],

          fallback: "style-loader"
        })
      },
      {
        test: /\.(svg)$/,
        include: path.join(__dirname, 'src/images'),
        loader: 'url-loader?limit=20000'
      } // inline base64 URLs for <=10k images, direct URLs for the rest
    ]
  },
  plugins: [
    extractSass,
    polyfillPromise
  ]
};

if (!isDevMode) {
  //config.devtool = 'eval';

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));
}

module.exports = config;
