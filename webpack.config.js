const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const combineLoaders = require('webpack-combine-loaders');

// const SystemBellPlugin = require('system-bell-webpack-plugin');

module.exports = {
  devServer: {
    hot: true,
    clientLogLevel: 'none',
    host: '0.0.0.0',
    // Enable this if you want to use your computer's IP Address
    // useLocalIp: true,
    port: 9999,
    // This suppresses the compiling information in the terminal.
    noInfo: true,
    overlay: true,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { 
            loader: 'css-loader',
            options: {
              modules: true,
            }
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader'
      // }, 
      // {
      //   test: /\.css$/,
      //   loader: 'css-loader',
      //   options: {
      //     importLoaders: 2,
      //     modules: true,
      //     camelCase: true,
      //     // localIdentName: '[path][name]__[local]--[hash:base64:5]',
      //   },
      // }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new SystemBellPlugin(),
  ]
};