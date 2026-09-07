const Livre = require('../models/Livre');

async function getAll(req, res) {
    const livres = await Livre.find();
    res.json(livres);
}

async function getOne(req, res) {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
        return res.status(404).json({ message: 'Le livre pas trouvé' })
    }
    res.json(livre);
}

async function create(req, res) {
    const livre = await Livre.create(req.body);
    res.status(201).json(livre);
}

async function update(req, res) {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body);
    if (!livre) {
        return res.status(404).json({ message: 'Le livre pas trouvé' })
    }
    res.json(livre);
}

async function deleteLivre(req, res) {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) {
        return res.status(404).json({ message: 'Le livre pas trouvé' })
    }
    res.json({ message: 'Livre supprimer' });
}

module.exports = { getAll, getOne, create, update, deleteLivre }