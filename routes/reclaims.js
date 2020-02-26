const express = require('express');
const router = express.Router();
const multer = require('multer');

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const reclaimsQueries = require('../queries/reclaimsQueries');


/* FILE UPLOAD */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/reclaims');
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
  if ((file.mimetype).slice(0, 6) === 'image/') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


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


router.post('/add/', upload.single('reclaimPhoto'), async (req, res, next) => {
    try {
        const name = processInput(req.body.name, "hardVarchar50", "name");
        const composition = processInput(req.body.composition, "hardVarchar150", "composition");
        const quantity_num = processInput(req.body.quantity_num, "idNum", "quantity num");
        const quantity_label = processInput(req.body.quantity_label, "hardVarchar25", "quantity label");
        const body = processInput(req.body.body, "hardText", "body");
        const creator_id = processInput(req.body.creator_id, "idNum", "creator id");
        const is_need = processInput(req.body.is_need, "bool", "is need boolean");
        const photo_url = processInput(req, "reclaimPhotoUrl", "photo url");

        const response = await reclaimsQueries.addReclaim({
            name,
            composition,
            quantity_num,
            quantity_label,
            body,
            creator_id,
            is_need,
            photo_url
        });
        res.status(201);
        res.json({
            status: "success",
            message: `reclaim '${response["reclaims.id"]}' added`,
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
