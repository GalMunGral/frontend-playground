import React, { Component } from 'react';
// Added for Redux
import { connect } from 'react-redux';
import { completeTask } from './actions';

class App extends Component {
  render() {
    return (
      <div style= {{
        width: '50vw',
        marginLeft: '25vw',
        fontFamily: 'system-ui',
        userSelect: 'none'
      }}>
        <h1>To-Do List</h1>
        {this.props.items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '5px 10px',
              color: item.done ? 'white' : 'black',
              background: item.done ? '#1D71F2' : 'white',
              transition: 'background-color 0.3s, color 0.3s'
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
