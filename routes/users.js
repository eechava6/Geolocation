const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);






module.exports = router;