var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../webpack.config')

new WebpackDevServer(webpack(config), {
  contentBase: 'public',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(8080, 'localhost', function (err, result) {
  if (err) console.error(err)
  console.log('Listening at localhost:8080')
})
