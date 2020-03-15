/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Client Redux User SimAuth Reducer | Greenlist Registry (a full-stack sustainable material forum app)
*/


/* IMPORTS */
// import { AN_ACTION } from '../actionTypes';


/* MAIN */
const INITIAL_STATE = {
  debug: "Hola, debug."
  // cId: 1,
  // cUsername: "just judi",
  // cAvatarUrl: "http://localhost:11211/images/uploaded-avatars/avatar-sporty-her.svg"
}

const userAuthReducer = (state = INITIAL_STATE, action) => {
  const newState = { ...state };
  return newState;
}


export default userAuthReducer;
