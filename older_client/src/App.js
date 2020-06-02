import React, { Component } from 'react';
import { Provider } from 'react-redux';
import  store from './components/js/store';
import { loadUserAccount } from './actions/authActions'
import SwitchMan from './components/js/SwitchMan'

import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUserAccount());
  }

  render() {

    return (
      <Provider store={store}>
        <div className="App">
          <SwitchMan />
        </div>
      </Provider>
    )
  }
}

export default App;
