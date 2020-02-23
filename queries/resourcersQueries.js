const db = require('../helpers/db')

const getAllResourcers= async () => {
    const getQuery = `
      SELECT *
      FROM resourcers;
    `;
    return await db.any(getQuery);
  }


  const getResourcerById = async (id) => {
    try {
      const getQuery = `
        SELECT *
        FROM resourcers
        WHERE id = $/id/;
      `;
      return await db.one(getQuery, { id });
    } catch (err) {
      if (err.message === "No data returned from the query.") {
        throw new Error(`404__error: user ${id} does not exist`);
      }
      throw (err);
    }
  }

  const addResourcer = async (bodyObj) => {
    try {
      console.log(bodyObj)
      const postQuery = `
        INSERT INTO resourcers (company, password, about, avatar_url, phone_number,email, website_url, address)
        VALUES ($/company/
          , $/password/, $/about/, $/avatar_url/, $/phone_number/, $/email/, 
          $/website_url/, $/address/
        ) RETURNING *;
      `;
      return await db.one(postQuery, bodyObj);
    } catch (err) {
      console.log(err)
      if (err.message.includes("violates unique constraint")) {
        throw new Error(
          `403__error: company ${bodyObj.company} already exists. Please try again with a new company.`
        );
      }
      throw (err);
    }
  }

//patch missing // 
  module.exports = {
    getAllResourcers,
    getResourcerById,
    addResourcer
  }