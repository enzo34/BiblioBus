const jwt = require('jsonwebtoken');

function verifierToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'Token manquant' })
    }

    const token = header.split(' ')[1]

    try {
        req.utilisateur = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: 'Token invalide ou expiré' })
    }
}

function verifierRole(roleAttendu) {
    return (req, res, next) => {
        if (req.utilisateur.role !== roleAttendu) {
            return res.status(403).json({ message: 'Accès interdit' })
        }
        next()
    }
}

module.exports = { verifierToken, verifierRole }