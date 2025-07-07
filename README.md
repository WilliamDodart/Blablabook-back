# 📚 Blabla Book - Ma bibliothèque personnelle
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express)
![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat&logo=postgresql)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

Une application fullstack pour gérer sa collection de livres : ajouter, modifier, supprimer, classer et retrouver facilement ses lectures préférées.
Retrouvez la partie front-end ici : https://github.com/WilliamDodart/Blablabook-front/tree/develop

---

## 🚀 Fonctionnalités

- 🗂️ Créer, modifier et supprimer plusieurs bibliothèques personnelles par utilisateur
- 📚 Ajouter, modifier ou supprimer des livres dans chaque bibliothèque
- ✅ Marquer un livre comme lu ou à lire
- 🔎 Rechercher un livre par titre, auteur ou catégorie
- 🗨️ Poster des notes et des commentaires sur les livres
- 👤 Gérer les informations personnelles de l'utilisateur (email, pseudo…)
- 🛡️ Interface administrateur pour ajouter, modifier ou supprimer des livres de la base de donnée

---

## 📷 Aperçu (screenshots)

![blablabook_1](https://github.com/user-attachments/assets/777e29ac-0ac3-441a-8ae2-4418081fab8f)
![blablabook_2](https://github.com/user-attachments/assets/5b36d02f-32b5-4b32-a7db-3958d24b602f)
![blablabook_4](https://github.com/user-attachments/assets/a6f417c8-841c-4e7c-a5fe-d20a5a790760)
![blablabook_3](https://github.com/user-attachments/assets/5e022843-0c27-4521-a40a-e4e244736e83)

---
---

# Blabla Book Back - Procédure d'initialisation

### 1. Cloner le dépôt

```bash
git clone <clé_ssh_du_repo>
cd blabla-book-back
```

### 2. Installer les dépendances

```bash
npm install
```

## 3. Créer l'utilisateur et la base de donnée
```
sudo -i -u postgres psql
CREATE USER nom_user WITH PASSWORD 'mot_de_passe';
CREATE DATABASE nom_base OWNER nom_user
```
Penser à se déconnecter (`CTRL + D`)


## 4. Configurer les variables d'environnement
Créer un fichier .env à parti du fichier .env.example et modifier `user`, `password`, `nom_base` et `port`par vos informations

```
PG_URL=postgres://user:password@localhost:5432/nom_base
PORT=port
```

## 5. Synchroniser la base donnée
```
npm run db:sync
npm run db:seed
```

## 6. Démarrer le serveur
```
npm run dev
```


## Fin de l'initialisation

