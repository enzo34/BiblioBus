const formulaire = document.getElementById('formulaire');
const message = document.getElementById('message')

formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/api/auth/connexion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: document.getElementById('email').value,
            motDePasse: document.getElementById('password').value,
        })
    })
    if(!response.ok) {
        message.textContent = 'Identifiants incorectes';
        return;
    }
    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);

    window.location.href = 'catalogue.html'

})