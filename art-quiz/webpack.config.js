const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode:"development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/img/[name][contenthash][ext]'
  },
  module: {
    rules:[
        {
         test: /\.html$/i,
         use: 'html-loader',
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader,'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
      }
    ]
},
  devServer:{
    port:4200,
    hot:isDev
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'[name].[contenthash].html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({  
      filename:'[name].[contenthash].css',
    }
    )

  ]
  ,
};