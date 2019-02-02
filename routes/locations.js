const express = require('express');
const router = express.Router();
const locationController = require('../app/api/controllers/locations');

router.post('/searchLocations',locationController.search);
router.post('/saveLocation',locationController.save);
module.exports = router;