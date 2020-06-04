import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './history'

ReactDOM.render(
  <React.StrictMode history={history}>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
