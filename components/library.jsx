import React from 'react'
import SoundBubble from './bubble'
import {tagNames} from '../helpers/constants'
import sortBy from 'lodash.sortby'

export default class Library extends React.Component {
  static propTypes = {
    userID: React.PropTypes.string.isRequired,
    collection: React.PropTypes.arrayOf(React.PropTypes.shape({
      trackID: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      composedBy: React.PropTypes.string.isRequired,
      layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
      tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      timesPlayed: React.PropTypes.number.isRequired
    })).isRequired,
    loadTrack: React.PropTypes.func.isRequired,
    deleteTrack: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      byMe: false,
      tagFilter: 0
    }

    this.toggleByMe = this.toggleByMe.bind(this)
    this.selectTagFilter = this.selectTagFilter.bind(this)
  }

  toggleByMe (event) {
    this.setState({byMe: event.target.checked})
  }

  selectTagFilter (event) {
    this.setState({tagFilter: event.target.selectedIndex})
  }

  render () {
    const checkByMeProps = {
      type: 'checkbox',
      checked: this.state.byMe,
      onClick: this.toggleByMe
    }

    const tagsDropdown = ['--None--'].concat(tagNames)
      .map((tag, idx) => <option key={idx} >{tag}</option>)

    let filteredCollection = (this.state.byMe && this.props.userID !== 'Anon')
      ? this.props.collection.filter(track => track.composedBy === this.props.userID)
      : this.props.collection
    if (this.state.tagFilter) {
      filteredCollection = filteredCollection.filter(track => {
        return track.tags.indexOf(tagNames[this.state.tagFilter - 1]) > -1
      })
    }
    filteredCollection = sortBy(filteredCollection, track => -track.timesPlayed)
    filteredCollection = filteredCollection.map((trackInfo, idx) => {
      return <TrackInfo key={idx} {...trackInfo}
        loadTrack={this.props.loadTrack}
        deleteTrack={this.props.deleteTrack} />
    })

    return (
      <div>
        <h3>Explore & find new tracks</h3>
        <label><input {...checkByMeProps} />By me</label>
        <label>Filter by tag:
          <select onChange={this.selectTagFilter} >{tagsDropdown}</select>
        </label>
        <ul>{filteredCollection}</ul>
      </div>
    )
  }
}

class TrackInfo extends React.Component {
  static propTypes = {
    trackID: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    composedBy: React.PropTypes.string.isRequired,
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    timesPlayed: React.PropTypes.number.isRequired,
    loadTrack: React.PropTypes.func.isRequired,
    deleteTrack: React.PropTypes.func.isRequired
  };

  render () {
    const layerSet = this.props.layers
      .map((volume, idx) => {
        return {
          sampleID: idx,
          volume: volume,
          size: 1,
          active: false
        }
      })
      .filter(props => props.volume > 0)
      .map(props => {
        return <SoundBubble key={props.sampleID} {...props} />
      })

    const tagSet = this.props.tags.map((tag, idx) => {
      return <span key={idx}>{tag}</span>
    })

    return (
      <li>
        <h3>{this.props.title}</h3>
        <h6>{'Composed by: ' + this.props.composedBy}</h6>
        <div>{layerSet}</div>
        <label>Tags:{tagSet}</label>
        <h3>{this.props.timesPlayed}</h3>
        <button value={this.props.trackID} onClick={this.props.loadTrack} >Listen</button>
        <button value={this.props.trackID} onClick={this.props.deleteTrack} >X</button>
      </li>
    )
  }
}
