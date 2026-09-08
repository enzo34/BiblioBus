const liste = document.getElementById('liste');
console.log(liste);
const formulaire = document.getElementById('formulaire');
const champId = document.getElementById('id');
const champTitre = document.getElementById('titre');
const champAuteur = document.getElementById('auteur');
const champExemplaire = document.getElementById('exemplaires');
const boutonValider = document.getElementById('button-valider');
const boutonAnnuler = document.getElementById('button-annuler');

async function afficherLivres() {
    const response = await fetch('http://localhost:3000/api/livres');
    const livres = await response.json();
    console.log(livres)

    liste.innerHTML = '';

    for (const livre of livres) {
        console.log(livre.titre)
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${livre.titre}</strong> - ${livre.auteur}
            (${livre.exemplairesDisponibles} / ${livre.exemplaires} disponible)
            <button class="modifier">Modifier</button>
            <button class="supprimer">Supprimer</button>
        `

        li.querySelector('.modifier').addEventListener('click', () => remplirFormulaire(livre) )
        li.querySelector('.supprimer').addEventListener('click', () => supprimerLivre(livre._id) )
        liste.appendChild(li)
    }
}

formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();

    const livre = {
        titre: champTitre.value,
        auteur: champAuteur.value,
        exemplaires: Number(champExemplaire.value)
    }

    if (champId.value === '') {
        await fetch('http://localhost:3000/api/livres', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token },
            body: JSON.stringify(livre)
        })
    } else {
        await fetch('http://localhost:3000/api/livres/' + champId.value, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livre)
        })
    }

    viderFormulaire()
    afficherLivres();
})

async function supprimerLivre(id) {
    if(!confirm('Supprimer ce livre ?')) return;
    await fetch('http://localhost:3000/api/livres/' + id, {
        method: 'DELETE'
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

boutonAnnuler.addEventListener('click', viderFormulaire);

afficherLivres();