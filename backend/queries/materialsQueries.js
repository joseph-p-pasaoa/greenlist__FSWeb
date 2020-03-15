const db = require ('../helpers/db')

const getAllMaterials = async () => {
    const getQuery = `
      SELECT *
      FROM materials
    `;
    return await db.any(getQuery);
  }


  const getMaterialsById = async (id) => {
    try {
      const getQuery = `
        SELECT *
        FROM materials
        WHERE id = $/id/;
      `;
      return await db.one(getQuery, { id });
    } catch (err) {
      if (err.message === "No data returned from the query.") {
        throw new Error(`404__error: Material ${id} does not exist`);
      }
      throw (err);
    }
  }

  module.exports ={
      getAllMaterials,
      getMaterialsById
  }
