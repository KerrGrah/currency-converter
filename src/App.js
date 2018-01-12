import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {
  fetchRates,
  newFrom,
  newTo,
  setRate,
  converted,
  inputAmount,
  saveExchange,
  deleteItem,
  loadFromIdb
} from './actions/ratesActions';
import Calculator from './components/Calculator';
import Select from './components/Select';
import Header from './components/Header';
import Saved from './components/Saved';

class App extends Component {

  handleFromClick(fromCurrency) {
    this.props.dispatch(newFrom(fromCurrency));
  }

  handleToClick(toCurrency) {
    this.props.dispatch(newTo(toCurrency))
  }

  convert(inputAmount = this.props.inputAmount, from = this.props.from, to = this.props.to, rates = this.props.rates) {

    let result = 1;

    // USD is the base rate from the API, so the rate can be used without conversion
    if (from === "USD") {
      result = rates[to];
      this.props.dispatch(setRate(result));
      return this.calculateAmount(inputAmount, result)
    }
    // otherwise convert fromCurrency to USD
    result /= rates[from];

    // then convert to toCurrency
    result = (result * rates[to]).toFixed(4);

    this.props.dispatch(setRate(result));
    this.calculateAmount(inputAmount, result)
  }

  calculateAmount(val = this.props.inputAmount, conversion = this.props.conversion) {
    let amount = (val * conversion).toFixed(2)
    this.props.dispatch(converted(amount))
  }

  handleInput(val) {
    this.props.dispatch(inputAmount(val))
    this.calculateAmount(val)
  }

  saveExchange() {
    this.props.dispatch(saveExchange(Date.now()))
  }

  componentWillMount = () => {
    // check if there are previously saved data in browser
    this.props.dispatch(loadFromIdb())
    // call API
    this.props.dispatch(fetchRates(this.props.baseRate, this.props.currencies))

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.needConvert === true)
      this.convert(nextProps.inputAmount, nextProps.from, nextProps.to, nextProps.rates)
  }
  deleteItem(key) {
    this.props.dispatch(deleteItem(key));
  }
  refresh() {
    this.props.dispatch(fetchRates(this.props.baseRate, this.props.currencies))
  }
  render() {

  const {rates} = this.props;

    return (
      <div>
        <Header refresh={this.refresh.bind(this)}/>
        <div className="container">
          <div className="from-rates">
            {this.props.fetched && <Select prefix="from" rates={rates} handleClick={this.handleFromClick.bind(this)}/>}
          </div>
          <Calculator fetching={this.props.fetching} fetched={this.props.fetched} handleInput={this.handleInput.bind(this)} to={this.props.to} from={this.props.from} converted={this.props.converted} saveClick={this.saveExchange.bind(this)} inputAmount={this.props.inputAmount}/>
          <div className="to-rates">
            {this.props.fetched && <Select prefix="to" rates={rates} handleClick={this.handleToClick.bind(this)}/>}
          </div>
        </div>
        {this.props.fetched && <Saved deleteItem={this.deleteItem.bind(this)} data={this.props.savedExchanges}/>}
      </div>
    )
  }
}

const mapStateToProps = store => {

  return {
    ...store.rates
  }
}

export default connect(mapStateToProps)(App);
