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
        // combining two separate insertions into one channeled task using db.task
        return await db.task(async t => {
            const postRecaimQuery = `
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
            const reclaimResponse = await t.one(postRecaimQuery, bodyObj);

            // if no attached photo, return response
            if (bodyObj.photo_url === "") {
              return reclaimResponse;
            } else {

              // use new reclaim id from reclaim response to add to photos table
              const newReclaimId = reclaimResponse.id;
              const postPhotoQuery = `
                  INSERT INTO photos (photo_url,
                      reclaim_id
                  )
                  VALUES ($/photo_url/,
                      $/newReclaimId/
                  )
                  RETURNING *;
              `;
              const photoResponse = await t.one(postPhotoQuery, { photo_url: bodyObj.photo_url, newReclaimId });

              // combine responses into one detailed response
              const combinedResponse = {
                "reclaims.id": reclaimResponse.id,
                ...reclaimResponse,
                "photos.id": photoResponse.id,
                "photos.reclaim_id": photoResponse.reclaim_id,
                "photos.photo_url": photoResponse.photo_url
              };
              delete combinedResponse.id; // now redundant because of reclaims.id object key, so delete
              return combinedResponse;
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
      return await db.one(deleteQuery, {id});
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
    addReclaim,
    deleteReclaim
};
