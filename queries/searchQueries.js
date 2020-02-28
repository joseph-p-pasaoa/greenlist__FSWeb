const db = require("../helpers/db");

const searchNew = async input => {
  const getQuery = `
      SELECT resourcers.id,
             resourcers.avatar_url,
             resourcers.company,
             array_agg (materials.name) AS materials,
             COUNT (materials.id)
      FROM resourcers
      JOIN products ON resourcers.id = products.resourcers_id
      JOIN materials ON products.material_id = materials.id
      WHERE materials.name ILIKE '%' || $1 || '%'
      GROUP BY resourcers.id
      ORDER BY COUNT (materials.id) DESC
      ;
    `;
  return await db.any(getQuery, [input]);
}

const searchReclaimed = async input => {
  const getQuery = `
      SELECT creators.id,
             avatar_url,
             firstname,
             lastname,
             array_agg( distinct reclaims.composition ORDER BY reclaims.composition ASC ) AS materials,
             COUNT (reclaims.id)
      FROM creators
      JOIN reclaims ON creators.id = reclaims.creator_id
      WHERE reclaims.composition ILIKE '%' || $1 || '%'
      GROUP BY creators.id
      ORDER BY COUNT (reclaims.id) DESC
      ;
    `;
  return await db.any(getQuery, [input]);
}


module.exports = {
  searchNew,
  searchReclaimed
}
