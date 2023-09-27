const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Define o nome do arquivo CSS de saída
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
  entry: path.resolve(__dirname, './src/index.js'), 
  devtool: "eval-source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'), 
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        use: [ MiniCssExtractPlugin.loader,, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // loader: 'file-loader',
        // options: {
        //   outputPath: 'images',
        // },
      },

    ],
  }, 
  devServer: { 
    //contentBase: path.join(__dirname, 'public'),
    static: {
      directory: path.join(__dirname, '.'),
    }, 
    hot: true,
  }
};
 