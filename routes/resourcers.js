const express = require("express");
const router = express.Router();

const handleError = require("../helpers/handleError");
const processInput = require("../helpers/processInput");
const queries = require("../queries/resourcersQueries");

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
    const company = processInput(req.body.company, "hardVarchar25", "company");
    const password = processInput(
      req.body.password,
      "hardVarchar25",
      "password"
    );
    const about = processInput(req.body.about, "hardVarchar50", "about");
    const avatar_url = processInput(
      req.body.avatar_url,
      "softPicUrl",
      "avatar url"
    );
    const phone_number = processInput(
      req.body.phone_number,
      "hardVarchar25",
      "phone number"
    );
    const email = processInput(req.body.email, "hardVarchar50", "email");
    const website_url = processInput(
      req.body.website_url,
      "hardText",
      "website url"
    );
    const address = processInput(req.body.address, "hardVarchar150", "address");

    const response = await queries.addResourcer({
      company,
      password,
      about,
      avatar_url,
      phone_number,
      email,
      website_url,
      address
    });
    res.status(201);
    console.log(email)
    res.json({
      status: "success",
      message: `new resoucer '${company}' added`,
      payload: response
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
});

router.patch("/edit/:id", async (req, res, next) => {
  try {
    const id = processInput(req.params.id, "idNum", "id");
    const company = processInput(req.body.company, "hardVarchar25", "company");

    const password = processInput(
      req.body.password,
      "hardVarchar25",
      "password"
    );

    const about = processInput(req.body.about, "hardVarchar25", "about");

    const avatar_url = ( req.body.avatar_url); 

    const phone_number = processInput(
      req.body.phone_number,
      "hardVarchar25",
      "phone number"
    );
    const email = (req.body.email)

    const website_url = processInput(
      req.body.website_url,
      "hardText",
      "website url"
    );
    const address = processInput(req.body.address, "hardVarchar150", "address");

    const response = await queries.editResourcer ({
      id,
      company,
      password,
      about,
      avatar_url,
      phone_number,
      email,
      website_url,
      address
    });
    res.status(201);
    res.json({
      status: "success",
      message: `Already existing'${company}' edited`,
      payload: response
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
});

module.exports = router;
