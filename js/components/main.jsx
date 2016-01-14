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
  return {
    title: '',
    composedBy: userID,
    layers: [],
    tags: []
  }
}

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: newTrack(),
      library: collection
    }
    this.trackLoader = this.trackLoader.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  trackLoader (trackID) {
    function loadEventHandler (event) {
      const newTrack = this.state.library.find(track => {
        return track.trackID === trackID
      })
      newTrack.timesPlayed++
      this.setState({current: newTrack})
      this.refs.compose.importState(newTrack.title, newTrack.tags)
      this.refs.player.togglePlay()
    }
    return loadEventHandler.bind(this)
  }

  uploadHandler (newData) {
    let maxID = -1
    collection.forEach(track => maxID = Math.max(maxID, track.trackID))
    const newTrack = {
      trackID: maxID + 1,
      composedBy: userID,
      title: newData.title,
      layers: this.state.current.layers,
      tags: newData.tags,
      timesPlayed: 0
    }

    this.state.library.push(newTrack)
    this.setState({current: newTrack})
  }

  render () {
    const playerProps = {
      ref: 'player',
      title: this.state.current.title,
      layers: this.state.current.layers,
      samples: [{}]
    }

    const composeProps = {
      ref: 'compose',
      title: this.state.current.title,
      composedBy: userID,
      layers: this.state.current.layers,
      tags: this.state.current.tags,
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
