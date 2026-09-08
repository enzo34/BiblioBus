const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Adherent = require('../models/Adherent');

async function connexion(req, res) {
    const { email, motDePasse } = req.body

    const adherent = await Adherent.findOne({ email }).select('+motDePasseHash');
    if (!adherent) {
        return res.status(401).json({ message: 'Identifiants incorect' });
    }
    const ok = await bcrypt.compare(motDePasse, adherent.motDePasseHash);
    if (!ok) {
        return res.status(401).json({ message: 'Identifiants incorect' })
    }

    const token = jwt.sign(
        { id: adherent._id, role: adherent.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    )
    res.json({ token, prenom: adherent.prenom, role: adherent.role });
}

module.exports = { connexion }