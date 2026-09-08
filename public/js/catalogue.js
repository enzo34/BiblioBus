const liste = document.getElementById('liste');
console.log(liste);
const formulaire = document.getElementById('formulaire');
const champId = document.getElementById('id');
const champTitre = document.getElementById('titre');
const champAuteur = document.getElementById('auteur');
const champExemplaire = document.getElementById('exemplaires');
const boutonValider = document.getElementById('button-valider');
const boutonAnnuler = document.getElementById('button-annuler');
const zoneErreurs = document.getElementById('erreurs')

async function afficherLivres() {
    const response = await fetch('http://localhost:3000/api/livres');
    const livres = await response.json();
    console.log(livres)

    liste.innerHTML = '';
    const estAdmin = localStorage.getItem('role') === 'admin';

    for (const livre of livres) {
        console.log(livre.titre)
        const li = document.createElement('li');
        const estAdmin = localStorage.getItem('role') === 'admin';
        li.innerHTML = `
            <strong>${livre.titre}</strong> - ${livre.auteur}
            (${livre.exemplairesDisponibles} / ${livre.exemplaires} disponible)
            ${estAdmin ? '<button class="modifier">Modifier</button> <button class="supprimer">Supprimer</button>' : ''}
        `


        if (estAdmin) {
            li.querySelector('.modifier').addEventListener('click', () => remplirFormulaire(livre))
            li.querySelector('.supprimer').addEventListener('click', () => supprimerLivre(livre._id))
        }
        if (!estAdmin) {
            formulaire.hidden = true
        }

        liste.appendChild(li)
    }
}

formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();
    zoneErreurs.textContent = '';

    const livre = {
        titre: champTitre.value,
        auteur: champAuteur.value,
        exemplaires: Number(champExemplaire.value)
    }

    const erreurs = validerFormulaire(livre);
    if(erreurs.length > 0) {
        zoneErreurs.textContent = erreurs.join(' - ');
    }

    if (champId.value === '') {
        await fetch('http://localhost:3000/api/livres', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify(livre)
        })
    } else {
        await fetch('http://localhost:3000/api/livres/' + champId.value, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify(livre)
        })
    }

    viderFormulaire()
    afficherLivres();
})

async function supprimerLivre(id) {
    if (!confirm('Supprimer ce livre ?')) return;
    await fetch('http://localhost:3000/api/livres/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },

    })
    afficherLivres();
}

function remplirFormulaire(livre) {
    champId.value = livre._id;
    champTitre.value = livre.titre;
    champAuteur.value = livre.auteur;
    champExemplaire.value = livre.exemplaires;
    boutonValider.textContent = "Enregistrer";
    champId.hidden = false;
}

function viderFormulaire() {
    formulaire.reset();
    champId.value = '';
    boutonValider.textContent = 'Ajouter';
    boutonAnnuler.hidden = true;
}

function validerFormulaire(livre) {
    const erreurs = [];
    if (!livre.titre || livre.titre.trim() === '') {
        erreurs.push('Le titre est obligatoire')
    }
    if (!livre.auteur || livre.auteur.trim() === '') {
        erreurs.push('L\'auteur est obligatoire')
    }
    if (!Number.isInteger(livre.exemplaires) || livre.exemplaires < 0) {
        erreurs.push('Le nombre d\'exemplaire dois etre un chiffre entier et etre supérieur à 0')
    }
    if (!livre.annee !== undefined || (livre.annee < 1400 || livre.annee > 2100)) {
        erreurs.push('L\'annee dois etre comprise entre 1400 et 2100');
    }
}

boutonAnnuler.addEventListener('click', viderFormulaire);

afficherLivres();