const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  return {
    devServer: {
      clientLogLevel: 'none',
      // Enable this if you want correctly render after changes.
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      // This suppresses the compiling information in the terminal.
      noInfo: true,
      // Set this to open the browser when webpack runs.
      open: false,
      overlay: true,
      // Enable this if you want to use your computer's IP Address.
      // useLocalIp: true,
      port: 9999,
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
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
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: './index.html',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        chunkFilename: '[id].css',
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        HELLO: '1+1+1',
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode),
        },
      }),
    ],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@modules': path.resolve(__dirname, 'src/modules'),
        '@scss': path.resolve(__dirname, 'scss'),
        '@views': path.resolve(__dirname, 'src/views'),
      },
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 600,
      ignored: /node_modules/,
      poll: 1000,
    },
  };
};
