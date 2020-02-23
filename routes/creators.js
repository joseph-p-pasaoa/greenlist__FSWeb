const express = require('express');
const router = express.Router();
const db = require('../helpers/db');
const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const creatorsQueries = require('../queries/creatorsQueries')


router.get('/', async (req, res, next) => {
    try {
        let allPhotos = await creatorsQueries.getAllCreators()
        res.json({
            status: "success",
            message: "all creators retrieved",
            payload: allPhotos
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const id = processInput(req.params.id, "idNum", "creator id");
        let photo = await creatorsQueries.getCreatorById(id)
        res.json({
            status: "success",
            message: "Retrieved specific creator",
            payload: photo,
            err: false
        })
    } catch (err) {
        handleError(err, req, res, next);
    }
});



router.post("/add/", async (req, res, next) => {
    try {
        const username = processInput(req.body.username, "hardVarchar25", "username");
        const firstname = processInput(req.body.firstname, "hardVarchar25", "firstname");
        const lastname = processInput(req.body.lastname, "hardVarchar25", "lastname");
        const password = processInput(req.body.password, "hardVarchar50", "password");
        const about = processInput(req.body.about, "hardText", "about");
        const avatar_url = processInput(req.body.avatar_url, "softPicUrl", "avatar url");
        const phone_number = processInput(req.body.phone_number, "hardVarchar25", "phone number");
        const email = processInput(req.body.email, "hardVarchar50", "email");
        const website_url = processInput(req.body.website_url, "hardText", "website url");
        const address = processInput(req.body.address, "hardVarchar150", "address");


        const response = await creatorsQueries.addCreator({ username, firstname, lastname, password, about, avatar_url, phone_number, email, website_url, address });
        res.status(201);
        res.json({
            status: "success",
            message: `new user '${username}' added`,
            payload: response
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});





router.patch("/edit/:id", async (req, res, next) => {
    try {
        const id =  processInput(req.params.id, "idNum", "id");
        const username = processInput(req.body.username, "hardVarchar25", "username");
        const firstname = processInput(req.body.firstname, "hardVarchar25", "firstname");
        const lastname = processInput(req.body.lastname, "hardVarchar25", "lastname");
        const password = processInput(req.body.password, "hardVarchar50", "password");
        const about = processInput(req.body.about, "hardText", "about");
        const avatar_url = processInput(req.body.avatar_url, "softPicUrl", "avatar url");
        const phone_number = processInput(req.body.phone_number, "hardVarchar25", "phone number");
        const email = processInput(req.body.email, "hardVarchar50", "email");
        const website_url = processInput(req.body.website_url, "hardText", "website url");
        const address = processInput(req.body.address, "hardVarchar150", "address");

        const response = await creatorsQueries.updateCreator({ username, firstname, lastname, password, about, avatar_url, phone_number, email, website_url, address, id });
        res.status(201);
        res.json({
            status: "success",
            message: `user '${username}' edited`,
            payload: response
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});





module.exports = router;


