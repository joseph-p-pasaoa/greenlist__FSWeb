const db = require("../helpers/db");

const getAllResourcers = async () => {
  const getQuery = `
      SELECT *
      FROM resourcers
      JOIN products ON resourcers.id = products.resourcers_id
      JOIN materials ON products.material_id = materials.id
      ;
    `;
  return await db.any(getQuery);
};

const getResourcerById = async id => {
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
    throw err;
  }
};

const addResourcer = async bodyObj => {
  try {
    console.log(bodyObj);
    const postQuery = `
        INSERT INTO resourcers (company, password, about, avatar_url, phone_number,email, website_url, address)
        VALUES ($/company/
          , $/password/, $/about/, $/avatar_url/, $/phone_number/, $/email/,
          $/website_url/, $/address/
        ) RETURNING *;
      `;
    return await db.one(postQuery, bodyObj);
  } catch (err) {
    console.log(err);
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: company ${bodyObj.company} already exists. Please try again with a new company.`
      );
    }
    throw err;
  }
};

const editResourcer = async (bodyObj) => {
  try {
    const patchQuery = `UPDATE resourcers
  SET
  company = $/company/,
  password = $/password/,
  avatar_url= $/avatar_url/,
  phone_number =$/phone_number/,
  email= $/email/,
  website_url= $/website_url/,
  address = $/company/
  where id = $/id/
  RETURNING *;
  `;

    return await db.one(patchQuery, bodyObj);
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: username ${bodyObj.company} already exists. Please try again with a new username.`
      );
    }
    throw err;
  }
};






module.exports = {
  getAllResourcers,
  getResourcerById,
  addResourcer,
  editResourcer
};
