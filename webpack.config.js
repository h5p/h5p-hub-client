var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "h5p-hub-client.css"
});


const config = {
  entry: "./src/entries/dist.js",
  devtool: 'cheap-source-map',
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
        loader: 'url-loader?limit=10000'
      } // inline base64 URLs for <=10k images, direct URLs for the rest
    ]
  },
  plugins: [
    extractSass
  ]
};

module.exports = config;
