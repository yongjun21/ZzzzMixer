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
      playing: true,
      layers: Array(10).fill(0),
      library: []
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.volumeUpLayer = this.volumeUpLayer.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  togglePlay () {
    this.setState({playing: !this.state.playing})
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
      playing: true,
      layers: Array.from(selectedTrack.layers)
    })
    this.refs.compose.importState(selectedTrack.title, selectedTrack.tags)
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

    return (
      <div>
        <Player
          title={currentTrack.title}
          playing={this.state.playing}
          layers={this.state.layers}
          togglePlay={this.togglePlay} />
        <Compose
          ref='compose'
          composedBy={this.state.userID}
          layers={this.state.layers}
          uploadHandler={this.uploadHandler} />
        <Library
          userID={this.state.userID}
          collection={this.state.library}
          loadTrack={this.loadTrack}
          deleteTrack={this.deleteTrack} />
        <MixingRoom
          layers={this.state.layers}
          volumeUp={this.volumeUpLayer} />
      </div>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('main'))
