import React from 'react'
import {IndexLink, Link} from 'react-router'
import {titleString} from '../helpers'
import './style.css'

export default class NavBar extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    loginUser: React.PropTypes.func,
    logoutUser: React.PropTypes.func
  };

  render () {
    let welcome, titleStyle
    if (this.props.user) {
      welcome = <span className='welcome' >{'Hi ' + this.props.user.nickname + ','}</span>
      titleStyle = {paddingLeft: '0.7em'}
    }
    const title = <span style={titleStyle} >{titleString[window.location.pathname]}</span>
    const navIcon = window.location.pathname === '/compose'
      ? <IndexLink className='fa fa-share' to='/library'>Library</IndexLink>
      : <Link className='fa fa-share' to='/compose'>Composer</Link>
    const loginButton = this.props.user
      ? <button className='fa fa-sign-out' onClick={this.props.logoutUser} >Sign out</button>
      : <button className='fa fa-sign-in' onClick={this.props.loginUser} >Sign in</button>

    return (
      <header id='navbar'>
        <div className='title'>
          {welcome}
          {title}
        </div>
        {loginButton}
        {navIcon}
      </header>
    )
  }
}
