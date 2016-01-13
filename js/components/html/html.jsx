
import React, { Component, PropTypes } from 'react'

class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string.isRequired
  }

  static defaultProps = {
    title: 'Zzzz mixer',
    description: 'Mix tracks together to create some Zzzz'
  }

  render () {
    return (
      <html>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <title>{this.props.title}</title>
        <meta name='description' content={this.props.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: this.props.body }} />
      </body>
      </html>
    )
  }

}

export default Html
