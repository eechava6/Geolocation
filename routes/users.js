const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/registerUser', userController.create);
router.post('/authenticateUser', userController.authenticate);
router.get('/registerUser',userController.loadRegister)
router.get('/authenticateUser',userController.loadAuthenticate)
router.get('/userPage',userController.loadUserPage)
module.exports = router;