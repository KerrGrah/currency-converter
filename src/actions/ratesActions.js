import idbKeyval from '../indexeddb';

export function loadFromIdb() {
  return dispatch => {
    idbKeyval.getAll().then(data => {
      if (data.length > 0) {
        dispatch({type: "LOAD_FROM_IDB", payload: data})
      }
    })
  }
}
export function deleteItem(key) {
  return {type: "DELETE_ITEM", payload: key}
}

export function saveExchange(timeStamp) {
  return {type: "SAVE_EXCHANGE", payload: timeStamp}
}

export function inputAmount(val) {
  return {type: "INPUT_AMOUNT", payload: val}
}

export function newFrom(from) {
  return {type: "NEW_FROM", payload: from}
}
export function newTo(to) {
  return {type: "NEW_TO", payload: to}
}

export function setRate(rate) {
  return {type: "SET_RATE", payload: rate}
}

export function converted(amount) {
  return {type: "CONVERTED_AMOUNT", payload: amount}
}

export function fetchRates(baseRate, currencies) {
  return function(dispatch) {
    dispatch({type: "FETCH_RATES"});

    fetch(`https://api.fixer.io/latest?base=${baseRate}`).then((resp) => resp.json()).then((data) => {

      // add base rate because it is not in data.rates
      data.rates[baseRate] = 1.0000;
      // sort and filter for the curencies needed
      let sortedRates = {};
      currencies.forEach((key) => {
        sortedRates[key] = data.rates[key];
      })
      dispatch({type: "FETCH_RATES_FULFILLED", payload: sortedRates})
    }).catch((err) => {
      dispatch({type: "FETCH_RATES_REJECTED", payload: err})
    })
  }
}
