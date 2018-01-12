import React, {PureComponent} from 'react';
import Spinner from './Spinner'
import arrowSVG from '../images/arrow-up.js'

class Calculator extends PureComponent {

  handleInput(val) {
    this.props.handleInput(val);
  }
  render() {
    return (
    <div>
      <div>
        <div className="converted-amount"><p>{this.props.converted}</p></div>
        <div className="from-currency"><h3>{this.props.to}</h3></div>
        <div className="arrow-container">{arrowSVG()}</div>
        <div className="to-currency"><h3>{this.props.from}</h3></div>
      </div>
      <div>
        <input type="number" value={this.props.inputAmount} onChange={event => this.handleInput(event.target.value)} />
        <input type="button" value="Save" onClick={this.props.saveClick}></input>
      </div>
    </div>
    )
  }
}
export default Spinner(Calculator)
