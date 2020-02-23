const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/materialsQueries');


router.get("/", async (req, res, next) => {
    try {
      const allMaterials = await queries.getAllMaterials();
      res.status(200);
      res.json({
          status: "success",
          message: "all materials retrieved",
          payload: allMaterials
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

    
router.get("/:id", async (req, res, next) => {
    try {
      const id = processInput(req.params.id, "idNum", "user id");
      const materialsById = await queries.getMaterialsById(id);
      res.status(200);
      res.json({
          status: "success",
          message: `Materials ${id} retrieved`,
          payload: materialsById
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});

module.exports = router;