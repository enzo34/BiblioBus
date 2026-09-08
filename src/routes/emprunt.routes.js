const express = require('express');
const router = express.Router();
const empruntController = require('../controller/EmpruntController');
const {verifierToken } = require('../middleware/auth');

router.post('/', verifierToken, empruntController.emprunter);

module.exports = router;