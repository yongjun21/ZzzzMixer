import React from 'react'
import ReactDOM from 'react-dom'
import Player from '../components/player'
import Compose from '../components/compose'
import Library from '../components/library'
import MixingRoom from '../components/mixing'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userID: 'Jared Tong',
      currentTrackID: -1,
      layers: Array(10).fill(0),
      library: []
    }
    this.volumeUpLayer = this.volumeUpLayer.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  volumeUpLayer (event) {
    const selectedSampleID = +event.target.value
    if (this.state.layers[selectedSampleID] === 3) {
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
    if (!this.refs.player.state.playing) this.refs.player.togglePlay()
  }

  deleteTrack (event) {
    const selectedTrackID = +event.target.value
    this.state.library.splice(this.state.library.findIndex(track => {
      return track.trackID === selectedTrackID
    }), 1)
    this.forceUpdate()
  }

  uploadHandler (newData) {
    let maxID = -1
    this.state.library.forEach(track => maxID = Math.max(maxID, track.trackID))
    const newTrack = {
      trackID: maxID + 1,
      composedBy: this.state.userID,
      title: newData.title,
      layers: Array.from(this.state.layers),
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
      loadTrack: this.loadTrack,
      deleteTrack: this.deleteTrack
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

ReactDOM.render(<Main/>, document.getElementById('main'))
