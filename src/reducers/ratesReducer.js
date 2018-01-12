import idbKeyval from '../indexeddb';

export default function reducer(state = {
  baseRate: "USD",
  currencies: [
    "USD",
    "RUB",
    "EUR",
    "GBP",
    "CAD",
    "JPY",
    "CHF",
    "CNY",
    "BRL",
    "BGN",
    "CZK",
    "DKK",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "KRW",
    "SEK",
    "NOK",
    "NZD",
    "PHP"
  ],
  rates: {},
  fetching: false,
  fetched: false,
  error: null,
  from: "USD",
  to: "EUR",
  converted: 0,
  conversion: 1,
  needConvert: false,
  inputAmount: 0,
  savedExchanges: []
}, action) {

  switch (action.type) {
    case "LOAD_FROM_IDB":
      {
        return {
          ...state,
          savedExchanges: action.payload
        }
      }
    case "SAVE_EXCHANGE":
      {
        const currentExchange = {
          from: state.from,
          to: state.to,
          converted: state.converted,
          inputAmount: state.inputAmount,
          key: action.payload
        }

        idbKeyval.set(action.payload, currentExchange)
        return {
          ...state,
          savedExchanges: [
            ...state.savedExchanges,
            currentExchange
          ]
        }
      }
    case "DELETE_ITEM":
      {
        idbKeyval.delete(action.payload)
        return {
          ...state,
          savedExchanges: state.savedExchanges.filter(item => item.key !== action.payload)
        }
      }
    case "INPUT_AMOUNT":
      {
        return {
          ...state,
          inputAmount: action.payload
        }
      }
    case "CONVERTED_AMOUNT":
      {
        return {
          ...state,
          converted: action.payload,
          needConvert: false
        };
      }
    case "SET_RATE":
      {
        return {
          ...state,
          conversion: action.payload,
          needConvert: false
        };
      }
    case "FETCH_RATES":
      {
        return {
          ...state,
          fetching: true,
          fetched: false
        };
      }
    case "FETCH_RATES_FULFILLED":
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          rates: action.payload,
          needConvert: true,
        };
      }
    case "FETCH_RATES_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
      }
    case "NEW_FROM":
      {
        return {
          ...state,
          from: action.payload,
          needConvert: true
        }
      }
    case "NEW_TO":
      {
        return {
          ...state,
          to: action.payload,
          needConvert: true
        }
      }
  }
  return state;
}
