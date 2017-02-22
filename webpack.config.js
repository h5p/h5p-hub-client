var path = require('path');
var WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
  entry: "./src/entries/dist.js",
  devtool:  'source-map',
  plugins: [
    new WebpackAutoInject()
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "h5p-hub-client.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "node_modules/h5p-sdk/src/scripts"),
          path.resolve(__dirname, "src/scripts"),
          path.resolve(__dirname, "src/entries")
        ],
        loader: 'babel'
      }
    ]
  }
};