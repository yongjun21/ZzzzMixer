import React from 'react'

export default class World extends React.Component {
  static propTypes = {
    times: React.PropTypes.number
  };

  constructor (props) {
    super(props)
    this.state = {
      times: this.props.times
    }
    setInterval(() => {
      this.setState({times: this.state.times + 1})
      console.log(this.state.times)
    }, 1000)
  }

  render () {
    const output = []
    for (let i = 0; i < this.state.times; i++) {
      output.push(<h1 key={i}>F</h1>)
    }
    return (
      <div>
        {output}
      </div>
    )
  }
}
