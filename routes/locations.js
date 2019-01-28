const express = require('express');
const router = express.Router();
const locationController = require('../app/api/controllers/locations');

router.post('/searchLocation',locationController.search);
router.post('/saveLocation',locationController.save);

module.exports = router;