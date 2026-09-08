const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

router.post('/connexion', authController.connexion);

module.exports = router;