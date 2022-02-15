import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {createStore, compose} from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './utils/localStorage';
import {applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  compose(applyMiddleware(thunk), composeWithDevTools())
)

store.subscribe(() => {
  saveState({
    authedUser: store.getState().authedUser
  });
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
