const express = require('express');
const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const reclaimsQueries = require('../queries/reclaimsQueries');


router.get('/', async (req, res, next) => {
    try {
        const allReclaims = await reclaimsQueries.getAllReclaims()
        res.status(200);
        res.json({
            status: "success",
            message: "all reclaims retrieved",
            payload: allReclaims
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const id = processInput(req.params.id, "idNum", "reclaim id");
        const reclaimById = await reclaimsQueries.getReclaimsById(id);
        res.status(200);
        res.json({
            status: "success",
            message: `reclaim ${id} retrieved`,
            payload: reclaimById
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.post('/add/', async (req, res, next) => {
    try {
        const name = processInput(req.body.name, "hardVarchar50", "name");
        const quantity_num = processInput(req.body.quantity_num, "idNum", "quantity num");
        const quantity_label = processInput(req.body.quantity_label, "hardVarchar25", "quantity label");
        const body = processInput(req.body.body, "hardText", "body");
        const composition = processInput(req.body.composition, "hardVarchar150", "composition");
        const creator_id = processInput(req.body.creator_id, "idNum", "creator id");
        const is_need = processInput(req.body.is_need, "bool", "is need");

        const response = await reclaimsQueries.addReclaim({
            name,
            quantity_num,
            quantity_label,
            body,
            composition,
            creator_id,
            is_need
        });
        res.status(201);
        res.json({
            status: "success",
            message: `reclaim '${name}' added`,
            payload: response
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id =  processInput(req.params.id, "idNum", "id");
    
        const response = await reclaimsQueries.deleteReclaim(id);
        res.status(201);
        res.json({
            status: "success",
            message: `reclaim '${id}' deleted`,
            payload: response
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


module.exports = router;
