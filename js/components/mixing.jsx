import React from 'react'
import s from './mixing.styl'

export default class Mixing extends React.Component {
  // static propTypes = {
  //   tracks: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  //   samples: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  // };

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

  render () {
    const self = this

    const bubbleProps = {

    }

    return (
      <div {...bubbleProps} className="Mixing-bubble">
        <label>{ self.props.label }</label>
      </div>
    )
  }
}
