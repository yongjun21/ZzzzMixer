import React from 'react'
import TrackInfo from './TrackInfo'
import {tagNames} from '../helpers'
import sortBy from 'lodash.sortby'

export default class Library extends React.Component {
  static propTypes = {
    userID: React.PropTypes.string,
    collection: React.PropTypes.arrayOf(React.PropTypes.object),
    loadTrack: React.PropTypes.func
  };

  constructor (props) {
    super(props)

    this.state = {
      byMe: false,
      tagFilter: 0
    }

    this.toggleByMe = this.toggleByMe.bind(this)
    this.selectTagFilter = this.selectTagFilter.bind(this)
    this.deleteTrack = this.deleteTrack.bind(this)
  }

  toggleByMe (event) {
    this.setState({byMe: event.target.checked})
  }

  selectTagFilter (event) {
    this.setState({tagFilter: event.target.selectedIndex})
  }

  deleteTrack (event) {
    this.props.collection.splice(this.props.collection.findIndex(track => {
      return track.trackID === +event.target.value
    }), 1)
    this.forceUpdate()
  }

  render () {
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
      return (
        <TrackInfo
          key={idx}
          {...trackInfo}
          loadTrack={this.props.loadTrack}
          deleteTrack={this.deleteTrack} />
      )
    })

    return (
      <section>
        <h3>Explore & find new tracks</h3>
        <label>
          <input
            type='checkbox'
            checked={this.state.byMe}
            onClick={this.toggleByMe} />
          By me
        </label>
        <label>Filter by tag:
          <select onChange={this.selectTagFilter} >{tagsDropdown}</select>
        </label>
        <ul>{filteredCollection}</ul>
      </section>
    )
  }
}
