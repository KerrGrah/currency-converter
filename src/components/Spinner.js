import React, {Component} from 'react';

const Spinner = (WrappedComponent) => {
  return class Spinner extends Component {
    render() {
      //TODO add error message
      if (!this.props.fetching && this.props.fetched) {
        return (<WrappedComponent {...this.props}/>)
      }
      return (<div className="spinner"/>)
    }
  }
}

export default Spinner;
