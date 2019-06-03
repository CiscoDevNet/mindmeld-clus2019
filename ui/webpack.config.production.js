const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');


module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].[chunkhash].js',
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
        {
          loader: 'file-loader', options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'assets/images/'
          }
        }
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
    new webpack.NoEmitOnErrorsPlugin(),
    process.env.INCLUDE_STAT ? new BundleAnalyzerPlugin() : () => {},
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: 'What is Deep-Domain Conversational AI?',
      version: pkg.version,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new Dotenv({
      path: './.env-prod',
      safe: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
    })
  ],

  devtool: 'cheap-source-map',
};
