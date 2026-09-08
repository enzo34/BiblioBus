const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema(
    {
        adherentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adherent', required: true },
        livreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Livre', required: true },
        dateEmprunt: { type: Date, default: Date.now },
        dateRetourPrevue: { type: Date, required: true },
        dateRetourEffective: { type: Date, required: true },
    },
    { timestamps: true }
)

empruntSchema.index({ adherentId: 1, dateRetourEffective: 1 });
module.exports = mongoose.model('Emprunt', empruntSchema)