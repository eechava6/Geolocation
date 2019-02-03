const express = require('express');
const router = express.Router();
const locationController = require('../app/api/controllers/locations');

router.get('/searchLocations',locationController.search);
router.post('/saveLocation',locationController.save);
router.post('/clearLocations',locationController.clear);

module.exports = router;