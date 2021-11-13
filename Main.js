import React from 'react';
import App from './App';
import store from './redux/configureStore';
import { Provider } from 'react-redux';

export default function Main () {
  return (
    <Provider store={store}>
      <App pointerEvents="none"/>
    </Provider>
  );
}
