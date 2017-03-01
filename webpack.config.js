var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "h5p-hub-client.css"
});


const config = {
  entry: "./src/entries/dist.js",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "h5p-hub-client.js",
    sourceMapFilename: '[file].map'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
      path.resolve('./node_modules/h5p-sdk/src/scripts')
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
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],

          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractSass
  ]
};

module.exports = config;