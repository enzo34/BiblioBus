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
    const erreurs = validerLivre(req.body);
    if (erreurs.length > 0) {
        return res.status(400).json({ erreurs })
    }
    const livre = await Livre.create(req.body);
    res.status(201).json(livre);
}

async function update(req, res) {
    const erreurs = validerLivre(req.body);
    if (erreurs.length > 0) {
        return res.status(400).json({ erreurs })
    }
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


function validerLivre(body) {
    const erreurs = [];
    if (!body.titre || body.titre.trim() === '') {
        erreurs.push('Le titre est obligatoire')
    }
    if (!body.auteur || body.auteur.trim() === '') {
        erreurs.push('L\'auteur est obligatoire')
    }
    if (!Number.isInteger(body.exemplaires) || body.exemplaires < 0) {
        erreurs.push('Le nombre d\'exemplaire dois etre un chiffre entier et etre supérieur à 0')
    }
    if (!body.annee !== undefined || (body.annee < 1400 || body.annee > 2100)) {
        erreurs.push('L\'annee dois etre comprise entre 1400 et 2100');
    }
}
module.exports = { getAll, getOne, create, update, deleteLivre }