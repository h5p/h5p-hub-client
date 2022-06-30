const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeEnv = process.env.NODE_ENV || 'development';
const libraryName = process.env.npm_package_name;

const config = {
  mode: nodeEnv,
  context: path.resolve(__dirname, 'src'),
  entry: "./entries/dist.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${libraryName}.js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'node_modules/react-async'),
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader',
        options: {
          limit: 1000000
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${libraryName}.css`
    })
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    if (argv.api !== 'test') {
      config.entry = "./src/entries/dev.js";
    }
  }

  return config;
};
