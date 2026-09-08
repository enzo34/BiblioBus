const Livre = require('../models/Livre');
const Emprunt = require('../models/Emprunt');

const MAX_EMPRUNTS = 3;
const DUREE_JOURS = 21;

async function emprunterLivre(adherentId, livreId) {
    const livre = await Livre.findById(livreId);
    if(!livre) throw new Error('Livre introuvable');
    if(livre.exemplairesDisponibles < 1) throw new Error('Aucun exemplaire disponible')

    const enCours = await Emprunts.countDocuments({adherentId, dateRetourEffective: null})
    if(enCours >= MAX_EMPRUNTS) throw new Error('Vous avez dépassez le nombre d\'emprunt')
    
    const dejaChezLui = await Emprunt.findOne({adherentId, livreId, dateRetourEffective: null})
    if(dejaChezLui) throw new Error('Vous avez déja ce livre')

    livre.exemplairesDisponibles -= 1
    await livre.save()

    return Emprunt.create({
        adherentId, 
        livreId,
        dateRetourPrevue: new Date(Date.now() + DUREE_JOURS * 24 * 3600 * 1000)
    })

}

module.exports = { emprunterLivre }