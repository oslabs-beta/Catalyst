const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.png', '.svg'],
    mainFields: ['main', 'module', 'browser'],
  },
  entry: './src/index.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        use: ['url-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  output: {
    path: path.resolve(__dirname, './dist/renderer'),
    filename: 'js/index.js',
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
}; 