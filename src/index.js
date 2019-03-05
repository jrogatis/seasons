import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends Component {
  state = {
    lat: null,
    long: null,
    errorMessage: ''
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent = () => {
    const { errorMessage, lat } = this.state;
    if (errorMessage && !lat) {
      return <div>Error: {this.state.error}</div>;
    }
    if (!errorMessage && lat) {
      return <SeasonDisplay lat={lat} />;
    }
    return <Spinner message="Accept location request" />;
  };

  render() {
    return <div className="border red"> {this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
