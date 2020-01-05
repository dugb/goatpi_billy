const express = require('express');
const router = express.Router();

const images = require('../controllers/images');

router.get('/latestimage', images.latestImage);
router.get('/imagelist', images.imageList);
router.get('/datelist', images.dateList);
router.get('/getimage', images.getImage);

module.exports = router;
