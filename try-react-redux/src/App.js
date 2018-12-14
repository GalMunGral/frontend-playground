import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { clickOnLeft, clickOnRight } from './action';
import { connect } from 'react-redux';

class App extends Component {

  clickHandler(e) {
    console.log('hey');
    if (e.clientX < window.innerWidth/2) {
      this.props.updateCounter(-1);
    } else {
      this.props.updateCounter(+1);
    }
  }

  render() {
    return (
      <div className="App" onClick={this.clickHandler.bind(this)}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Counter Value: {this.props.counter}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    counter: state.counter
  };
}

function dispatchToProps(dispatch) {
  return {
    updateCounter(i) {
      dispatch(i > 0 ? clickOnRight() : clickOnLeft());
    }
  };
}

App = connect(stateToProps, dispatchToProps)(App);

export default App;
