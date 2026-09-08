const express = require('express');
const router = express.Router();
const livreController = require('../controller/LivreController');
const {verifierToken, verifierRole } = require('../middleware/auth');

router.get('/', livreController.getAll);
router.get('/:id', livreController.getOne);


router.post('/', verifierToken, verifierRole('admin'), livreController.create);
router.put('/:id', verifierToken, verifierRole('admin'), livreController.update);
router.delete('/:id', verifierToken, verifierRole('admin'), livreController.deleteLivre);

module.exports = router;