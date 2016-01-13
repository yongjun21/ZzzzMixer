import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/Appconstants'
import InitDB from '../helpers/InitDB.js'
import EventEmitter from 'events'
import 'whatwg-fetch'
window.PouchDB = require('pouchDB')

const _state = {
  userID: '',
  playing: {
    title: 'Untitled',
    mix: [],
    tags: []
  }
}

export default class AppStore extends EventEmitter {
  constructor () {
    super()
    this.mongoDB = new InitDB()
    this.pouchDB = new window.PouchDB('zmixer')
  }

  init () {
    const tasks = [
      this.mongoDB.library.find().exec()
        .then(library => _state.library = library),
      this.pouchDB.get('userID')
        .then(cache => _state.userID = cache.userID)
        .catch(() => console.log('userID not in cache')),
      this.pouchDB.get('samples')
        .then(cache => _state.samples = cache.samples)
        .catch(() => {
          console.log('samples not in cache')
          window.fetch('', { Accept: 'application/json' })
            .then(data => data.json())
            .then(json => _state.samples = json)
        })
    ]

    function actionHandler (action) {
      switch (action.actionType) {
        case AppConstants.A:
          // do something
          break
        case AppConstants.B:
          // do something
          break
        default:
          // no op
      }
    }

    return Promise.all(tasks)
      .then(() => {
        AppDispatcher.register(actionHandler)
        return _state
      })
  }

  getState (key) {
    return _state[key]
  }

  push2mongoDB (doc, db) {
    this.mongoDB[db].create(doc)
  }

  emitChange () {
    this.emit('change')
  }

  addChangeListener (cb) {
    this.on('change', cb)
  }

  removeChangeListener (cb) {
    this.removeListener('change', cb)
  }

}
