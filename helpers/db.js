/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Server App MAIN | Greenlist Registry (a full-stack sustainable material forum app)
*/


const pgp = require('pg-promise')();
  const connectString = 'postgres://localhost:5432/greenlist_db';
  const db = pgp(connectString);


module.exports = db;
