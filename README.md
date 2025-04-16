 <h1 align="center">
  <br>
  <img src="public/logo.png" alt="logo" width="200">
  <br>
  <b>Gestion Dépenses</b>
  <br>
  <a href="README.md">
    <img src="https://img.shields.io/badge/README-FR-blue" alt="README-FR">
  </a>
  <a href="README-EN.md">
    <img src="https://img.shields.io/badge/README-EN-blue" alt="README-EN">
  </a>
</h1>

<br>

*Réalisé par [Carl](https://github.com/carlkolodziejski) (Scrum Master), [Axel](https://github.com/axelriv62) et [Quentin](https://github.com/quentinltg), étudiants de deuxième année (promotion 24-25) de BUT Informatique au sein de l'IUT de Lens.*

<br>

<p align="center">
  <img src="public/screenshot.png" alt="screenshot" width="800">
</p>

<br>

## Présentation

Cette application a été réalisée dans le cadre d'un projet de quatrième semestre en BUT Informatique à l'IUT de Lens.

L'objectif principal de ce projet est de créer une application de gestion de dépenses avec laquelle les utilisateurs pourraient suivre leurs dépenses.

<br>

## Objectifs

- Utiliser les paramètres dans le routage d’une page.
- Mettre en œuvre un service et l’utiliser.
- Utilisez les observables.
- Utiliser des fonctions asynchrones.
- Utiliser la notion de signal.
- Utiliser les requêtes asynchrones vers un serveur REST API
- Définir un formulaire de connexion et d’enregistrement d’un utilisateur.
- Recevoir et transmettre un jeton d’authentification.
- Mettre en place une validation des actions en fonction de l’identité de l’utilisateur connecté.
- Définir un formulaire à l’aide des classes et directives proposées par angular.
- Mettre en relation les champs d’un formulaire avec les données du composant.
- Mettre en place une validation des données.

## Récupérer le projet

```shell
# cloner le projet 
git clone https://github.com/axelriv62/gestion-depenses 

# extraire et entrer dans le projet de l'API fournit par le professeur
tar -xvzf gestion-depenses/depenses-serveur-api-v2.1.tar.gz
cd depenses-serveur-api-v2.1

# installer les dépendances
composer install

# copier le fichier d'exemple de configuration
cp .env.example .env

# générer la clé d'application
php artisan key:generate   

# créer les tables de la base de données
php artisan migrate --seed
# ou les re-créer 
php artisan migrate:fresh --seed

# lancer le serveur API 
php artisan serve 

# retourner dans le projet Angular
cd ../gestion-depenses

# installer les dépendances
npm install
# ou
pnpm install

# lancer le serveur Angular
ng serve
```

## Langages, outils et logiciels utilisés

![My Skills](https://go-skill-icons.vercel.app/api/icons?i=angular,ts,html,css,json,git,gitlab&theme=dark)
