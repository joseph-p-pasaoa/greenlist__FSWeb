const express = require('express');
  const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/resourcersQueries.js');


// getAllResourcers: get all resourcers

router.get("/", async (req, res, next) => {
    try {
      const getAllResourcers = await queries.getAllUsers();
      res.status(200);
      res.json({
          status: "success",
          message: "all users retrieved",
          payload: allUsers
      });
    } catch (err) {
      handleError(err, req, res, next);
    }
});