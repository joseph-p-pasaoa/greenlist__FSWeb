/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Client Redux Store | Greenlist Registry (a full-stack sustainable material forum app)
*/


/* IMPORTS */
import { createStore } from 'redux';

import rootReducer from './rootReducer';


/* STORE */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;
