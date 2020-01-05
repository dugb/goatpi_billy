const express = require('express');
const router = express.Router();

const data = require('../controllers/data');

router.get('/latestdata', data.latestData);

module.exports = router;