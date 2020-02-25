const express = require('express');
const router = express.Router();
const multer = require('multer');

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const photosQueries = require('../queries/photosQueries')


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
        let allPhotos = await photosQueries.getAllPhotos()
        res.json({
            status: "success",
            message: "all photos retrieved",
            payload: allPhotos
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const id = processInput(req.params.id, "idNum", "photo id");
        let photo = await photosQueries.getPhotosByReclaimId(id)
        res.json({
            status: "success",
            message: "Retrieved photo from a specific reclaim id",
            payload: photo
        })
    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.post('/add/', async (req, res, next) => {
    try {
        const photo_url = processInput(req, "reclaimPhotoUrl", "photo url");
        const reclaim_id = processInput(req.body.reclaim_id, "idNum", "reclaim id");

        let response = await photosQueries.addPhoto({ photo_url, reclaim_id });
        res.status(201);
        res.json({
            status: "success",
            message: `'${req.body.photo_url}' added`,
            payload: response
        });

    } catch (err) {
        handleError(err, req, res, next);
    }
});


router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = processInput(req.params.id, "idNum", "id");
        let response = await photosQueries.deletePhoto(id);
        res.status(201);
        res.json({
            status: "success",
            message: `photo.${id} deleted`,
            payload: response
        });
    } catch (err) {
        handleError(err, req, res, next);
    }
});


module.exports = router;