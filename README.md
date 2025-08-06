# 🎮 LoL-Together

Application web **React + TypeScript + Vite** pour la gestion de profils et d’équipes League of Legends.

---

## 🚀 Fonctionnalités

- Authentification avec JWT (frontend + backend Express)
- Récupération et mise à jour des informations utilisateur
- Enumération des rôles LoL, serveurs et statuts d’équipes
- Sélecteurs multi (langues, disponibilités) via Formik
- Gestion globale de l’utilisateur avec React Context
- Routes protégées avec React Router v6
- Modals animés avec Framer Motion et styles SCSS modulaires
- UI responsive, composants réutilisables, code scalable

---

## 🛠️ Stack Technique

- **React** (Vite + functional components)
- **TypeScript** strict
- **Formik** pour la gestion des formulaires
- **Framer Motion** pour animations et modals
- **SCSS Modules** pour les styles
- **React Router v6** pour le routage
- **jwt-decode** pour décoder le token JWT côté client
- **Express** pour le backend API

---

## 📦 Installation

git clone https://github.com/JongCHONG/LoL-Together.git

cd LoL-Together
npm install

### Lancer le projet en mode développement

npm run dev

---

## 🔒 Sécurité

- Stockage du token JWT côté client (localStorage)
- Décodage du token avec `jwt-decode` dans un hook personnalisé
- Gestion centralisée de l’utilisateur dans un contexte React
- Protection des routes sensibles côté frontend avec redirection

---

## 👤 Auteur

Projet codé et maintenu par JongCHONG.

N’hésite pas à me contacter pour toute question ou suggestion !
