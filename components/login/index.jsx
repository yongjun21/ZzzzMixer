import React from 'react'

export default class LogIn extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    loginUser: React.PropTypes.func,
    logoutUser: React.PropTypes.func
  };

  render () {
    const displayName = this.props.user
      ? 'Logged in as ' + this.props.user.nickname : ''
    const loginButton = this.props.user
      ? <button onClick={this.props.logoutUser}>Log out</button>
      : <button onClick={this.props.loginUser}>Log in</button>
    return (
      <section>
        <span>{displayName}</span>
        {loginButton}
      </section>
    )
  }
}
