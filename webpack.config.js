var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './app'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
