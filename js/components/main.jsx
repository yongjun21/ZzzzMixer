import React from 'react'
import Player from './player'
import Compose from './compose'
import Library from './library'
import MixingRoom from './mixing'

const collection = [
  {
    trackID: 1,
    title: 'Hello',
    composedBy: 'Anon',
    layers: [0, 3, 3, 3, 0, 0, 0, 0, 0, 0],
    tags: ['Nature', 'Sea'],
    timesPlayed: 10
  }, {
    trackID: 2,
    title: 'World',
    composedBy: 'yongjun21',
    layers: [0, 2, 0, 3, 0, 4, 0, 0, 0, 0],
    tags: ['New age'],
    timesPlayed: 99
  }, {
    trackID: 3,
    title: 'Happy birthday',
    composedBy: 'Jared Tong',
    layers: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    tags: ['Urban', 'White noise'],
    timesPlayed: 99
  }
]

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userID: 'Jared Tong',
      currentTrackID: -1,
      layers: Array(10).fill(0),
      library: collection
    }
    this.volumeUpLayer = this.volumeUpLayer.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  volumeUpLayer (event) {
    const selectedSampleID = +event.target.value
    if (this.state.layers[selectedSampleID] === 4) {
      this.state.layers[selectedSampleID] = 0
    } else {
      this.state.layers[selectedSampleID]++
    }
    this.forceUpdate()
  }

  loadTrack (event) {
    const selectedTrackID = +event.target.value
    const selectedTrack = this.state.library.find(track => {
      return track.trackID === selectedTrackID
    })
    selectedTrack.timesPlayed++
    this.setState({
      currentTrackID: selectedTrackID,
      layers: Array.from(selectedTrack.layers)
    })
    this.refs.compose.importState(selectedTrack.title, selectedTrack.tags)
    this.refs.player.togglePlay()
  }

  uploadHandler (newData) {
    let maxID = -1
    this.state.library.forEach(track => maxID = Math.max(maxID, track.trackID))
    const newTrack = {
      trackID: maxID + 1,
      composedBy: this.state.userID,
      title: newData.title,
      layers: this.state.layers,
      tags: newData.tags,
      timesPlayed: 0
    }

    this.state.library.push(newTrack)
    this.setState({currentTrackID: newTrack.trackID})
  }

  render () {
    const currentTrack = this.state.library.find(track => {
      return track.trackID === this.state.currentTrackID
    }) || {title: '', tags: []}

    const playerProps = {
      ref: 'player',
      title: currentTrack.title,
      layers: this.state.layers
    }

    const composeProps = {
      ref: 'compose',
      title: currentTrack.title,
      composedBy: this.state.userID,
      layers: this.state.layers,
      tags: currentTrack.tags,
      uploadHandler: this.uploadHandler
    }

    const libraryProps = {
      userID: this.state.userID,
      collection: this.state.library,
      loadTrack: this.loadTrack
    }

    const mixingRoomProps = {
      layers: this.state.layers,
      volumeUp: this.volumeUpLayer
    }

    return (
      <div>
        <Player {...playerProps} />
        <Compose {...composeProps} />
        <Library {...libraryProps} />
        <MixingRoom {...mixingRoomProps} />
      </div>
    )
  }
}
