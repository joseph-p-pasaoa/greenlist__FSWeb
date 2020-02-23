const express = require("express");
const router = express.Router();

const handleError = require("../helpers/handleError");
const processInput = require("../helpers/processInput");
const queries = require("../queries/resourcersQueries");

// getAllResourcers: get all resourcers

router.get("/", async (req, res, next) => {
  try {
    const AllResourcers = await queries.getAllResourcers();
    res.status(200);
    res.json({
      status: "success",
      message: "all resourcers retrieved",
      payload: AllResourcers
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = processInput(req.params.id, "idNum", "user id");
    const ResourcerById = await queries.getResourcerById(id);
    res.status(200);
    res.json({
      status: "success",
      message: `Resourcer ${id} retrieved`,
      payload: ResourcerById
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
});

router.post("/add", async (req, res, next) => {
    try {
      const company = processInput(req.body.company, "hardVarchar22", "company");

      const password = processInput(req.body.password, "hardVarchar22", "password");

      const about = processInput(req.body.about, "hardVarchar22", "about");

      const avatar_url = processInput(req.body.avatar_url, "softPicUrl", "avatar url");

      const phone_number = processInput(req.body.phone_number, "hardVarchar22", "phone number");

      const email = processInput(req.body.email, "hardVarchar22", "email");


      const website_url = (req.body.website_url)

      const address = processInput(req.body.address, "hardVarchar22", "address");


      
      const response = await queries.addResourcer({ company, password, about, avatar_url, phone_number, email, website_url, address });
      res.status(201);
      res.json({
          status: "success",
          message: `new user '${company}' added`,
          payload: response
      });
      console.log(email)
    } catch (err) {
      handleError(err, req, res, next);
    }
});

module.exports = router;