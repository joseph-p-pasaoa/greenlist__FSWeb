/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Server Database Connect Helper | Greenlist Registry (a full-stack sustainable material forum app)
*/


const pgp = require('pg-promise')();
  const connectString = process.env.DATABASE_URL;
  const db = pgp(connectString);


module.exports = db;
