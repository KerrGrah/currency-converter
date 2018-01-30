import React, {PureComponent} from 'react';
import arrowSVG from '../images/arrow-up.js';
import {numberWithCommas} from '../util-functions';

export default class Saved extends PureComponent {
  deleteItem(key) {
    this.props.deleteItem(key)
  }

  render() {
    const data = this.props.data;
    if (!data.length) {
      return '';
    }
    const savedExchanges = data.map((item, index) => <li key={"saved-exchange-" + item.key}>
      <div>
        <p>{item.from} {numberWithCommas(item.inputAmount)}{arrowSVG('right')}{numberWithCommas(item.converted)} {item.to}
        </p>
        <button className="delete-button" onClick={this.deleteItem.bind(this, item.key)}>X</button>
      </div>
    </li>)

    return (
      <ul className="saved-exchanges">{savedExchanges}</ul>
    )
  }
}
