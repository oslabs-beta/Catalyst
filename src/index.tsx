import React from 'react';
import ReactDom from 'react-dom';
import { App } from './reduxComponents/container';
import { Provider } from 'react-redux';
import { store } from './reduxComponents/store'; 

ReactDom.render(
<Provider store = {store}>
  <App />
</Provider>,
document.getElementById('root')); 