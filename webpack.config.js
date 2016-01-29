// var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:3000',
    // 'webpack/hot/only-dev-server',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
}
