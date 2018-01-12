import React, {PureComponent} from 'react'

export default class Select extends PureComponent {

  render() {
    return (
      <div className="header">
        <h1>Currency<span>Converter</span>
        </h1>
        <p className='refresh' onClick={this.props.refresh}>refresh</p>
      </div>
    )
  }
}
