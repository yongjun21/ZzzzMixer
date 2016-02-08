const express = require('express')
const path = require('path')
const fallback = require('express-history-api-fallback')

// const webpackMiddleware = require('webpack-dev-middleware')
// const webpack = require('webpack')
// const config = require('../webpack.config')

const port = process.env.PORT || 8080
const root = path.join(__dirname, '../public')
const app = express()

app.use(express.static(root))
app.use('/sample', express.static(path.join(__dirname, '../assets/audio')))
// app.use(webpackMiddleware(webpack(config), {
//   noInfo: true,
//   publicPath: '/assets/'
// }))
app.use(fallback('index.html', {root}))

app.listen(port)
console.log('Listening at port: ' + port)
