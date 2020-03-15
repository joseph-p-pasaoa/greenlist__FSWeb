/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Client INDEX MAIN | Greenlist Registry (a full-stack sustainable material forum app)
*/


/* IMPORTS */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';


/* MAIN */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
