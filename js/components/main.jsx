import React from 'react'
import Player from './player'
import Compose from './compose'
import Library from './library'

const userID = 'Anon'

const collection = [
  {
    trackID: 1,
    title: 'Hello',
    composedBy: 'Anon',
    layers: [
      {layerID: 1, volume: 3},
      {layerID: 2, volume: 3},
      {layerID: 3, volume: 3}
    ],
    tags: ['Nature', 'Sea'],
    timesPlayed: 10
  }, {
    trackID: 2,
    title: 'World',
    composedBy: 'yongjun21',
    layers: [
      {layerID: 1, volume: 2},
      {layerID: 3, volume: 3},
      {layerID: 5, volume: 4}
    ],
    tags: ['New age'],
    timesPlayed: 99
  }, {
    trackID: 3,
    title: 'Happy birthday',
    composedBy: 'Jared Tong',
    layers: [
      {layerID: 7, volume: 1},
      {layerID: 8, volume: 1},
      {layerID: 9, volume: 1}
    ],
    tags: ['Urban', 'White noise'],
    timesPlayed: 99
  }
]

function newTrack () {
  let maxID = -1
  collection.forEach(track => maxID = Math.max(maxID, track.trackID))
  return {
    trackID: maxID + 1,
    title: '',
    composedBy: userID,
    layers: [],
    tags: [],
    timesPlayed: 0
  }
}

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTrack: newTrack(),
      library: collection
    }
    console.log(this.state)
    this.trackLoader = this.trackLoader.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  trackLoader (trackID) {
    function loadHandler (event) {
      this.setState({
        currentTrack: this.state.library.find(track => {
          return track.trackID === trackID
        })
      })
    }
    return loadHandler.bind(this)
  }

  uploadHandler (newData) {
    Object.assign(this.state.currentTrack, newData)
    this.state.library.push(this.state.currentTrack)
    this.forceUpdate()
  }

  render () {
    const playerProps = {
      title: this.state.currentTrack.title,
      layers: this.state.currentTrack.layers,
      samples: [{}]
    }

    const composeProps = {
      title: this.state.currentTrack.title,
      composedBy: userID,
      layers: this.state.currentTrack.layers,
      tags: this.state.currentTrack.tags,
      uploadHandler: this.uploadHandler
    }

    const libraryProps = {
      userID: userID,
      collection: this.state.library,
      trackLoader: this.trackLoader
    }

    return (
      <div>
        <Player {...playerProps} />
        <Compose {...composeProps} />
        <Library {...libraryProps} />
      </div>
    )
  }
}
