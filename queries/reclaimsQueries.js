const pgp = require('pg-promise')({ // added pgp import here for helper in add reclaims logic
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});
const db = require('../helpers/db');


const getAllReclaims = async () => {
  const getQuery = `SELECT * FROM reclaims`;
  return await db.any(getQuery);
}


const getReclaimsById = async (id) => {
  try {
    const getQueryById =
      `SELECT * FROM reclaims 
        WHERE reclaims.creator_id = $/id/
      `;
    return await db.any(getQueryById, { id });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: reclaim of id:${id} does not exist`);
    }
    throw (err);
  }
}


const getSellReclaimedsById = async (id, is_need) => {
  try {
    // const getQueryById =
    //   `SELECT * FROM reclaims 
    //    JOIN photos ON reclaims.id = photos.reclaim_id
    //   WHERE reclaims.creator_id = $/id/ AND reclaims.is_need = $/is_need/
    //   ORDER BY reclaims.creator_id = $/id/

    // `;

    const getQueryById = `
    SELECT reclaims.* , 
    array_agg(distinct concat(photos.photo_url)) AS photo_url
    FROM reclaims
    LEFT JOIN photos ON reclaims.id = photos.reclaim_id
    WHERE reclaims.creator_id = $/id/ AND reclaims.is_need = $/is_need/
    GROUP BY reclaims.id
  `;




    return await db.any(getQueryById, { id, is_need });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: reclaim of id:${id} does not exist`);
    }
    throw (err);
  }
}


const addReclaim = async (bodyObj) => {
  try {
    // combining two separate insertions into one channeled task using db.task
    return await db.task(async t => {
      const postReclaimQuery = `
            INSERT INTO reclaims (name,
                quantity_num,
                quantity_label,
                body,
                composition,
                creator_id
            )
            VALUES ($/name/,
                $/quantity_num/,
                $/quantity_label/,
                $/body/,
                $/composition/,
                $/creator_id/
            )
            RETURNING *;
        `;
      const reclaimResponse = await t.one(postReclaimQuery, bodyObj);

      // if no attached photo, return response
      if (bodyObj.photo_url_array.length <= 0) {
        return reclaimResponse;
      } else {

        // use new reclaim id from reclaim response and generate multi-row insert query
        const newReclaimId = reclaimResponse.id;
        const columns = new pgp.helpers.ColumnSet(['photo_url', 'reclaim_id'], { table: 'photos' });
        const values = bodyObj.photo_url_array.map(photoUrl => {
          return (
            { photo_url: photoUrl, reclaim_id: newReclaimId }
          );
        });
        const postPhotosQuery = pgp.helpers.insert(values, columns) + 'RETURNING *';
        const photoResponse = await t.any(postPhotosQuery);

        // combine addPhotos response to reclaimResponse and return
        reclaimResponse["photos"] = photoResponse;
        return reclaimResponse;
      }
    });
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: creator ${bodyObj.creator_id} does not exist`
      );
    }
    throw (err);
  }
}


const deleteReclaim = async (id) => {
  try {
    const deleteQuery = `
      DELETE FROM reclaims
      WHERE id = $/id/
      RETURNING *;
    `;
    return await db.one(deleteQuery, { id });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: reclaim ${id} does not exist`);
    }
    throw (err);
  }
}


module.exports = {
  getAllReclaims,
  getReclaimsById,
  getSellReclaimedsById,
  addReclaim,
  deleteReclaim
};
