const mongoose = require('mongoose');

const adherentSchema = new mongoose.Schema(
    {
        prenom: { type: String, required: true, trim: true, maxLength: 50 },
        nom: { type: String, required: true, trim: true, maxLength: 50 },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Email invalide']
        },
        motDePassHash: { type: String, required: true, select: false },
        role: { type: String, enum: ['adherent', 'admin'], default: 'adherent' },
        estActif: { type: Boolean, default: true },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Adherent', adherentSchema);