export default class InitDB {
  constructor () {
    const dbURI = 'mongodb://' +
      process.env.ZMIXER_MONGODB_USER + ':' +
      process.env.ZMIXER_MONGODB_PASSWORD + '@' +
      process.env.ZMIXER_MONGODB_URL

    this.mongoose = require('mongoose')
    this.mongoose.connect(dbURI)

    this.library = this.mongoose.model('library', new this.mongoose.Schema({
      title: String,
      composedBy: String,
      downloads: Number,
      layers: [{
        layerID: Number,
        volume: Number
      }],
      tags: [String],
      createdDate: Date
    }))
  }
}
