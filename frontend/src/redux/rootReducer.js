/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Client Redux Root Reducer | Greenlist Registry (a full-stack sustainable material forum app)
*/


/* IMPORTS */
import { combineReducers } from 'redux';

import userAuthReducer from './reducers/userAuthReducer';
import uiReducer from './reducers/uiReducer';


/* COMBINEREDUCERS */
export default combineReducers({
  userAuthState: userAuthReducer,
  uiState: uiReducer
});
