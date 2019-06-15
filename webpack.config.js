const HtmlWebPackPlugin = require("html-webpack-plugin");
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // new SystemBellPlugin(),
  ]
};