const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const pkg = require('./package.json');


const PORT = process.env.PORT || 4200;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.jsx',
    // the entry point of our app
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'eslint-loader'
      }]
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader', options: {
            sourceMap: true
          }
        }]
    },{
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader', options: {
            sourceMap: true
          }
        }, {
          loader: 'less-loader', options: {
            sourceMap: true
          }
        }]
    },{
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader?name=[name]-[hash].[ext]'
      ]
    },{
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }]
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json', '.jsx', '.less', '.css']
  },

  plugins:[
    new CleanWebpackPlugin(['dist']),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: 'What is Deep-Domain Conversational AI?',
      version: pkg.version,
    }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],

  devtool: 'inline-source-map',

  devServer: {
    host: 'localhost',
    port: PORT,
    historyApiFallback: true,
    hot: true,
  },
};
