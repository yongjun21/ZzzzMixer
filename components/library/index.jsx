import React from 'react'
import TrackInfo from './TrackInfo'
import {tagNames, bgColors} from '../helpers'
import sortBy from 'lodash.sortby'
import './style.css'

export default class Library extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    collection: React.PropTypes.arrayOf(React.PropTypes.object),
    loadTrack: React.PropTypes.func,
    deleteTrack: React.PropTypes.func
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
    const tagsDropdown = ['--None--'].concat(tagNames)
      .map((tag, idx) => <option key={idx} >{tag}</option>)

    let filteredCollection = (this.state.byMe && this.props.user)
      ? this.props.collection.filter(track => track.composedBy &&
        track.composedBy.user_id === this.props.user.user_id)
      : this.props.collection
    if (this.state.tagFilter) {
      filteredCollection = filteredCollection.filter(track => {
        return track.tags.indexOf(tagNames[this.state.tagFilter - 1]) > -1
      })
    }
    filteredCollection = sortBy(filteredCollection, track => -track.timesPlayed)
    filteredCollection = filteredCollection.map((trackInfo, idx) => {
      const allowDelete = !!this.props.user &&
        (!trackInfo.composedBy || this.props.user.user_id === trackInfo.composedBy.user_id)
      const deleteButton = allowDelete
        ? <button onClick={this.props.deleteTrack(trackInfo._id)} >X</button>
        : null
      return (
        <TrackInfo
          key={idx}
          {...trackInfo}
          loadTrack={this.props.loadTrack(trackInfo._id)}
          deleteButton={deleteButton}
          bgColor={bgColors[idx % 5]} />
      )
    })

    return (
      <section>
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
