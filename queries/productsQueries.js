const db = require("../helpers/db");

const getAllProducts = async () => {
  const getQuery = `
      SELECT *
      FROM products
      
    `;
  return await db.any(getQuery);
};

const getProductById = async (resourcers_id) => {
  try {
    const getQuery = `
        SELECT products.*, materials.name As materials_name, materials.description, materials.photo_url
        FROM products
        JOIN materials ON products.material_id = materials.id
        WHERE resourcers_id = $/resourcers_id/;
      `;
    return await db.any(getQuery, { resourcers_id });
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(
        `404__error: product with resourcers ${resourcers_id} does not exist`
      );
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

const deleteProduct = async id => {
  try {
    const deleteQuery = `DELETE FROM products 
          WHERE id = $/id/`;

    return await db.none(deleteQuery, { id });
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
