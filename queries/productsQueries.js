const db = require("../helpers/db");

const getAllProducts = async () => {
  const getQuery = `
      SELECT *
      FROM products
      
    `;
  return await db.any(getQuery);
};

const getProductById = async (resourcers_id)=> {
  try {
    const getQuery = `
        SELECT *
        FROM products
        WHERE resourcers_id = $/id/;
      `;
    return await db.one(getQuery, { resourcers_id });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: product with resourcers ${id} does not exist`);
    }
    throw err;
  }
};

const addProduct = async bodyObj => {
  try {
    const postQuery = `
        INSERT INTO products (name,
          body, resourcers_id, material_id
        ) VALUES ($/name/
          , $/body/, $/resourcers_id/, $/material_id/
        ) RETURNING *;
      `;
    return await db.one(postQuery, bodyObj);
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: Product ${bodyObj.product} already exists. Please try again with a product.`
      );
    }
    throw err;
  }
};


const deleteProduct = async (id) => {
  try {
    const deleteQuery = `DELETE FROM products 
          WHERE id = $/id/`;

    return await db.one(deleteQuery, { id });
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: Product ${bodyObj.product} Unable to delete product`
      );
    }
    throw err;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct
};
