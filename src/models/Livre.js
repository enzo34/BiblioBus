const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true, trim: true, maxLength: 200 },
    auteur: { type: String, required: true, trim: true, maxLength: 100 },
    isbn: { type: String, unique: true, trim: true, sparse: true },
    annee: { type: Number, min: 1400, max: 2100 },
    resume: { type: String, maxLength: 2000 },
    exemplaires: { type: Number, required: true, min: 0, default: 1 },
    exemplairesDisponibles: { type: String, required: true, min: 0, default: 1 },
}, { timestamps: true })

livreSchema.index({ titre: 'text', auteur: 'text' })

module.exports = mongoose.model('Livre', livreSchema);
