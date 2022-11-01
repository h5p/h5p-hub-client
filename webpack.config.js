const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  const config = {
    context: path.resolve(__dirname, 'src'),
    entry: "./entries/dist.js",
    output: {
      path: path.join(__dirname, 'dist'),
      filename: "h5p-hub-client.js",
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
          test: /\.(sa|sc|c)ss$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1_000_000,
              },
            }
          ],
        }
      ]
    },
    plugins: []
  };
  if (devMode) {
    config.devtool = 'inline-source-map';
    if (argv.api !== 'test') {
      config.entry = "./entries/dev.js";
    }
  }
  else {
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "h5p-hub-client.css"
    }));
  }
  return config;
};
