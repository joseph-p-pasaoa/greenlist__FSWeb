const express = require('express');
const router = express.Router();
const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const photosQueries = require('../queries/photosQueries')


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
        const photo_url = processInput(req.body.photo_url, "softPicUrl", "photo url");
        const reclaim_id = processInput(req.body.reclaim_id, "idNum", "reclaim id");

        let response = await photosQueries.addPhoto({ photo_url, reclaim_id })

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
        let response = await photosQueries.deletePhoto(id)
        res.status(201);
        res.json({
            status: "success",
            message: `photos'${id}' deleted`,
            payload: response
        });

    } catch (err) {
        handleError(err, req, res, next);
    }
});


module.exports = router;