const path = require('path');

const config = {
  entry: "./src/entries/dist.js",
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
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader?limit=1000000'
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
};
