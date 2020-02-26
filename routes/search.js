const express = require("express");
const router = express.Router();

const handleError = require("../helpers/handleError");
const processInput = require("../helpers/processInput");
const queries = require("../queries/searchQueries");

router.get("/new", async (req, res, next) => {
  try {
    const searchResult = await queries.searchNew(req.body.input);
    res.status(200);
    res.json({
      status: "success",
      message: "searched through new materials",
      payload: searchResult
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
});

router.get("/reclaimed", async (req, res, next) => {
  try {
    const searchResult = await queries.searchReclaimed(req.body.input);
    res.status(200);
    res.json({
      status: "success",
      message: "searched through reclaimed materials",
      payload: searchResult
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
})

module.exports = router;
