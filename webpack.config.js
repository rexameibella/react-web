const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

const dotEnv = new DotEnv();

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  minify: true
});

const cssWebpackPlugin = new MiniCssExtractPlugin({
  filename: '[name].css'
});

const webpackShellPlugin = new WebpackShellPlugin({
  onBuildStart: ['echo Start'],
  onBuildEnd: [" echo ./bin/webpack-build-end.sh"]
});

module.exports = {
  entry: {
    bundle: './src/scripts/index.js'
  },
  output: {
    filename: '[name].js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['react']
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },{
          loader: 'css-loader',
        }, {
          loader: 'uglifycss-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'resources',
            },
          },
        ],
      }
    ]
  },
  plugins: [dotEnv, htmlWebpackPlugin, cssWebpackPlugin, webpackShellPlugin]
};
