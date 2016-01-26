import {sampleFileNames} from './helpers'

import 'whatwg-fetch'
window.URL = window.URL || window.webkitURL
window.PouchDB = require('pouchdb')

const audioDB = new window.PouchDB('zmixer-samples')
const localDB = new window.PouchDB('zmixer-library')
const remoteDB = new window.PouchDB(
  'https://daburu.cloudant.com/zmixer-library', {
    auth: {
      username: 'wougaralwassigstibutione',
      password: '60f5dacb732a0229543fb7a5fc404623d68ec5bc'
    }
  }
)

localDB.sync(remoteDB, {
  live: true,
  retry: true
})

export function loadAudio (sampleURLs, idx) {
  const fileName = sampleFileNames[idx]
  const extName = fileName + '.mp4'

  sampleURLs[idx] = 'sample/' + extName

  audioDB.getAttachment(fileName, extName)
    .then(blob => window.URL.createObjectURL(blob))
    .then(url => sampleURLs[idx] = url)
    .catch(() => {
      console.log('fetching audio sample ' + extName)
      window.fetch(window.location.origin + '/sample/' + extName)
        .then(res => res.blob())
        .then(blob => {
          audioDB.put({_id: fileName}).then(result => {
            audioDB.putAttachment(fileName, extName, result.rev, blob, 'audio/mp4')
          })
          return window.URL.createObjectURL(blob)
        })
        .then(url => sampleURLs[idx] = url)
    })
}

export function addToDB (track) {
  return localDB.post(track)
}

export function updateDB (track) {
  return localDB.put(track)
}

export function deleteFromDB (track) {
  return localDB.remove(track)
}

function fetchLocal (cb) {
  localDB.allDocs({include_docs: true})
    .then(docs => docs.rows.map(row => row.doc))
    .then(collection => cb({collection: collection}))
}

export function fetchDB (cb) {
  fetchLocal(cb)
  localDB.replicate.from(remoteDB).then(result => {
    console.log(result)
    fetchLocal(cb)
  })
}
