# BiblioBus
Application de gestion de prêts de livre pour une association.

## Installation
1. `git clone <url>` puis `cd BiblioBus`
2. `cp .env.example .env` et renseigner les valeurs
3. `docker compose up -d`
4. `npm install`
5. `npm run dev`

##Front-End statique
- pages dans `public`, CSS mobile first(`token.css` + `style.css`)
- Testés Lightouse (100 Accessibiility, Best Practice et SEO)

## Etapes 
1. Installation des outils
2. Créer le projet et le dépot git
3. Rechercher et installer les dépendances
4. Structurer le projet (l'arborescence)
5. Conteneriser les dépendances (BDD)
6. Setup les variables d'environment
7. Configurer le serveur (coder connexion BDD et une route de test)
8. Configurer les linter
9. Faire la doc
10. Wireframe / Zoning
11. Faire les maquettes sur Figma/Penpot ou autres
12. Contraste vérifié
13. Navigation (sauf si fait avec Figma)
14. Checklist RGAA
15. Eco-conception documentation faites
16. Présentation client, intégrés les retours
17. Etablir l'organisation des fichiers
18. faire le squellete html
19. faire mes pages html
20. faire mon css
21. tester Lightouse
22. faire l'entité (schema mongoose) sur le backend
23. faire le controller
24. faire les routes
25. tester avec postman
26. une fois valider faire le crud coté client
27. répéter l'opération de 22 à 26 autant de fois qu'il y a d'entité

https://trello.com/b/AiLFuMjW/example

API de test / Health Check: http://localhost:3000/api/health