const empruntService = require('../services/emprunt.service')
const Emprunt = require('../models/Emprunt');

async function emprunter(req, res) {
    try {
        const emprunt = await empruntService.emprunterLivre(req.utilisateur.id, req.body.livreId);
        res.status(201).json(emprunt)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { emprunter }