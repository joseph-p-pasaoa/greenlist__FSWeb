const db = require('../helpers/db');



const getAllCreators = async () => {
    const getQuery = `SELECT * FROM creators`;
    return await db.any(getQuery);
}


const getCreatorById = async (id) => {
    try {
        const getQueryById = 'SELECT * FROM creators WHERE id = $/id/';
        return await db.one(getQueryById, { id });
    } catch (err) {
        if (err.message === "No data returned from the query.") {
            throw new Error(`404__error: creator ${id} does not exist`);
        }
        throw (err);
    }
}

const getActiveCreator = async (username, password) =>{
  try {
    const getQueryByActive = '  SELECT * FROM creators WHERE username = $/username/ AND password = $/password/ '
   return await db.one(getQueryByActive, {username, password})
  } catch (err){
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: creator ${username} does not exist`);
  }
  throw (err);
}
}


const addCreator = async (bodyObj) => {
    try {
      const postQuery = `
        INSERT INTO creators (username, firstname, lastname, password, about, avatar_url, phone_number, email, website_url, address
        ) VALUES ($/username/
          ,$/firstname/, 
          $/lastname/, 
          $/password/, 
          $/about/,
          $/avatar_url/, 
          $/phone_number/, 
          $/email/, 
          $/website_url/, 
          $/address/
        ) RETURNING *;
      `;
      return await db.one(postQuery, bodyObj);
    } catch (err) {
      if (err.message.includes("violates unique constraint")) {
        throw new Error(
          `403__error: username ${bodyObj.username
            } already exists. Please try again with a new username.`
        );
      }
      throw (err);
    }
  }

  const updateCreator = async (bodyObj) => {
    try {
      const postQuery = `
        UPDATE creators
        SET
          username = $/username/,
          firstname = $/firstname/, 
          lastname = $/lastname/, 
          password = $/password/, 
          about = $/about/,
          avatar_url = $/avatar_url/, 
          phone_number = $/phone_number/, 
          email = $/email/, 
          website_url = $/website_url/, 
          address = $/address/
        WHERE id = $/id/
        RETURNING *;
        
      `;

      return await db.one(postQuery, bodyObj);
    } catch (err) {
      if (err.message.includes("violates unique constraint")) {
        throw new Error(
          `403__error: username ${bodyObj.username
            } already exists. Please try again with a new username.`
        );
      }
      throw (err);
    }
  }

module.exports = {
    getAllCreators,
    getCreatorById,
    addCreator,
    updateCreator,
    getActiveCreator
};