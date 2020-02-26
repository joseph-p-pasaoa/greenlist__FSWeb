const db = require("../helpers/db");

const searchNew = async input => {
  const getQuery = `
      SELECT *
      FROM resourcers JOIN products ON resourcers.id = products.resourcers_id JOIN materials ON products.material_id = materials.id
      WHERE materials.name ILIKE '%' || $1 || '%';
    `;
  return await db.any(getQuery, [input]);
}

const searchReclaimed = async input => {
  const getQuery = `
      SELECT *
      FROM creators JOIN reclaims ON creators.id = reclaims.creator_id
      WHERE reclaims.composition ILIKE '%' || $1 || '%';
    `;
  return await db.any(getQuery, [input]);
}


module.exports = {
  searchNew,
  searchReclaimed
}
