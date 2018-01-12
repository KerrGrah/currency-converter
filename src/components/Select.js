import React, {PureComponent} from 'react';

export default class Select extends PureComponent {

  render() {
    const keys = Object.keys(this.props.rates);
    const currencies = keys.map((key) => <li onClick={this.props.handleClick.bind(this, key)} key={this.props.prefix + "_" + key}><img src={require('../images/' + key + '.png')} alt={key + "-flag"}/></li>);
    return (
      <ul className="select-rates">{currencies}</ul>
    )
  }
}
