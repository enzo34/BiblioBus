const express = require('express');
const router = express.Router();
const livreController = require('../controller/LivreController');

router.get('/', livreController.getAll);
router.get('/:id', livreController.getOne);
router.post('/', livreController.create);
router.put('/:id', livreController.update);
router.delete('/:id', livreController.deleteLivre);

module.exports = router;