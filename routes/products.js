const express = require("express");
const router = express.Router();

const handleError = require("../helpers/handleError");
const processInput = require("../helpers/processInput");
const queries = require("../queries/productsQueries");

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await queries.getAllProducts();
    res.status(200);
    res.json({
      status: "success",
      message: "all Products retrieved",
      payload: allProducts
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
});

router.get("/:resourcers_id", async (req, res, next) => {
  try {
    const resourcers_id = processInput(req.params.resourcers_id, "idNum", "resoucer id");
    console.log(resourcers_id)
    const productById = await queries.getProductById(resourcers_id);
    res.status(200);
    res.json({
      status: "success",
      message: `Product of resourcer with id ${resourcers_id} retrieved`,
      payload: productById
    });
    console.log(id)
  } catch (err) {
    handleError(err, req, res, next);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const name = processInput(req.body.name, "hardVarchar22", "name");

    const body = (req.body.body)

    resourcers_id = processInput(
      req.body.resourcers_id,
      "idNum",
      "resourcers id"
    );

    material_id = processInput(
      req.body.material_id,
      "idNum",
      "material id"
    );

    const newProduct = await queries.addProduct({
      name,
      body,
      resourcers_id,
      material_id
    });
    res.status(201);
    res.json({
      status: "success",
      message: `new product '${name}' added`,
      payload: newProduct
    });
  } catch (err) {
    handleError(err, req, res, next);
      throw new Error(
        `403__error: username ${bodyObj.username
          } already exists. Please try again with a new username.`
      );
  }
});


router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = processInput(req.params.id, "idNum", "product id");
    const deletedProduct = await queries.deleteProduct(id);
    res.status(200);
    res.json({
      status: "success",
      message: `Product ${id} deleted`,
      payload: deletedProduct
    });
    
  } catch (err) {
    handleError(err, req, res, next);
    console.log(err)
  }
});

module.exports = router;
