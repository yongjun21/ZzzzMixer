import React from 'react'
import classNames from 'classnames'
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

  toggleByMe () {
    this.setState({byMe: !this.state.byMe})
  }

  selectTagFilter (event) {
    this.setState({tagFilter: event.target.selectedIndex})
  }

  render () {
    const tagsDropdown = ['--None--'].concat(tagNames)
      .map((tag, idx) => <option key={idx} >{tag}</option>)

    let filteredCollection = (this.state.byMe && this.props.user)
      ? this.props.collection.filter((track) => track.composedBy &&
        track.composedBy.user_id === this.props.user.user_id)
      : this.props.collection
    if (this.state.tagFilter) {
      filteredCollection = filteredCollection.filter((track) => {
        return track.tags.indexOf(tagNames[this.state.tagFilter - 1]) > -1
      })
    }
    filteredCollection = sortBy(filteredCollection, (track) => -track.timesPlayed)
    filteredCollection = filteredCollection.map((trackInfo, idx) => {
      const allowDelete = !!this.props.user &&
        (!trackInfo.composedBy || this.props.user.user_id === trackInfo.composedBy.user_id)
      const deleteButton = allowDelete
        ? <button className='fa fa-trash-o' onClick={this.props.deleteTrack(trackInfo._id)} />
        : null
      const listenButton =
        <button key='listen' className='fa fa-music' onClick={this.props.loadTrack(trackInfo._id)} />
      return (
        <TrackInfo
          key={idx}
          {...trackInfo}
          deleteButton={deleteButton}
          listenButton={listenButton}
          bgColor={bgColors[idx % 5]} />
      )
    })

    const toggleButtonProps = {
      className: classNames('fa', {
        'fa-toggle-on': !this.state.byMe,
        'fa-toggle-off': this.state.byMe
      }),
      onClick: this.toggleByMe
    }

    return (
      <section id='library'>
        <div className='filters'>
          <div className='ctn'>
            <span className='fa fa-tag' />
            <select onChange={this.selectTagFilter} >
              {tagsDropdown}</select>
          </div>
          <div className='ctn'>
            Songs by Me
            <button {...toggleButtonProps} />
          </div>
        </div>
        <ul>{filteredCollection}</ul>
        <div className='padding' />
      </section>
    )
  }
}
