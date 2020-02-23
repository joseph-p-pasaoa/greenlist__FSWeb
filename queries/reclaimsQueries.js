const db = require('../helpers/db');



const getAllReclaims = async () => {
    const getQuery = `SELECT * FROM reclaims`;
    return await db.any(getQuery);
}


const getReclaimsById = async (id) => {
    try {
        const getQueryById = 'SELECT * FROM reclaims WHERE id = $/id/';
        return await db.one(getQueryById, { id });
    } catch (err) {
        if (err.message === "No data returned from the query.") {
            throw new Error(`404__error: reclaim ${id} does not exist`);
        }
        throw (err);
    }
}



const addReclaim = async (bodyObj) => {
    try {
        const postQuery = `
        INSERT INTO reclaims (name, 
            quantity_num, 
            quantity_label,
            body,
            composition,
            creator_id,
            is_need
        ) VALUES ($/name/
          , $/quantity_num/
          , $/quantity_label/
          , $/body/
          , $/composition/
          , $/creator_id/
          , $/is_need/
        ) RETURNING *;
      `;
        return await db.one(postQuery, bodyObj);
    } catch (err) {
        if (err.message.includes("violates unique constraint")) {
            throw new Error(
                `403__error: reclaim ${bodyObj.quantity_label
                } can not be added.`
            );
        }
        throw (err);
    }
}



const deleteReclaim = async (id) => {
    try {
      const deleteQuery = `
        DELETE FROM creators
        WHERE id = $/id/
        RETURNING id ;
      `;

      return await db.one(deleteQuery, {id});
    } catch (err) {
      if (err.message.includes("violates unique constraint")) {
        throw new Error(
          `403__error: reclaims can't be deleted. Try again later.`
        );
      }
      throw (err);
    }
  }


module.exports = {
    getAllReclaims,
    getReclaimsById,
    addReclaim,
    deleteReclaim

};