const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/i,
        use: 'source-map-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
