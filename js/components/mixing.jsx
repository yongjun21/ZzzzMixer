import React from 'react'
import classNames from 'classnames'

import './mixing.styl'

export default class Mixing extends React.Component {
  // static propTypes = {
  //   tracks: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  //   samples: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  // }

  constructor (props) {
    super(props)
    this.state = {
      samplenames: ['cafe', 'fire', 'jungle', 'rain', 'river', 'seawaves', 'wind']
    }
  }

  render () {
    return (
      <section className='Mixing-section'>
        {this.state.samplenames.map((name, idx) => {
          return <Bubble label= {name} key= {idx}/>
        })
        }
      </section>
    )
  }
}

class Bubble extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      selected: false,
      bubbleSize: 1
    }
  }

  handleClick (e) {
    // const target = React.findDOMNode(this)
    // target.classList.toggle('Mixing-bubble-animate')
    if (!this.state.selected) {
      this.setState({selected: true})
    } else if (this.state.bubbleSize === 3) {
      this.setState({
        selected: false,
        bubbleSize: 1
      })
    }
    else this.setState({bubbleSize: this.state.bubbleSize + 1})
    console.log(this.state.selected, this.state.bubbleSize)
  }

  render () {
    const self = this

    let bubbleSize = this.state.bubbleSize

    const bubbleClass = classNames({
      'Mixing-bubble': true,
      'Mixing-bubble-selected': this.state.selected,
      // ['Mixing-bubble-${buttonSize}']: this.state.selected && (this.state.bubbleSize > 1)
      'Mixing-bubble-2': this.state.selected && (this.state.bubbleSize === 2),
      'Mixing-bubble-3': this.state.selected && (this.state.bubbleSize === 3)
    })

    const bubbleProps = {

    }

    return (
      <div {...bubbleProps} className={bubbleClass} onClick={this.handleClick.bind(this)}>
        <label>{ self.props.label }</label>
      </div>
    )
  }
}
