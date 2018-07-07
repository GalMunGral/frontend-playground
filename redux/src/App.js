import React, { Component } from 'react';
// Added for Redux
import { connect } from 'react-redux';
import { completeTask } from './actions';

class App extends Component {
  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        {this.props.items.map((item, i) => (
          <div
            key={i}
            style={{
              background: item.done ? 'lightgray' : 'white'
            }}
            onClick={() => {
              this.props.testCallback(i)
            }}
          >
            <h3>{item.content.title}</h3>
            <p>{item.content.detail}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testCallback: i => {
      dispatch(completeTask(i))
    }
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App;
