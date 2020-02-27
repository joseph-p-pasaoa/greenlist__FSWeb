const db = require("../helpers/db");

const searchNew = async input => {
  const getQuery = `
      SELECT resourcers.id,
             resourcers.company,
             array_agg (materials.name) AS materials
      FROM resourcers
      JOIN products ON resourcers.id = products.resourcers_id
      JOIN materials ON products.material_id = materials.id
      WHERE materials.name ILIKE '%' || $1 || '%'
      GROUP BY resourcers.id;
    `;
  return await db.any(getQuery, [input]);
}

const searchReclaimed = async input => {
  const getQuery = `
      SELECT creators.id,
             firstname,
             lastname,
             array_agg(distinct concat(reclaims.composition)) AS materials,
             COUNT (reclaims.id)
      FROM creators
      JOIN reclaims ON creators.id = reclaims.creator_id
      WHERE reclaims.composition ILIKE '%' || $1 || '%'
      GROUP BY creators.id;
    `;
  return await db.any(getQuery, [input]);
}


module.exports = {
  searchNew,
  searchReclaimed
}
