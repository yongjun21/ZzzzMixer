import React from 'react'

export default class Compose extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  };

  render () {
    return React.cloneElement(this.props.children, this.props)
  }
}
