# Frontend LoL-Together

Frontend React + TypeScript pour l'application LoL-Together.

## Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Langage typé
- **Vite** - Bundler et serveur de développement
- **ESLint** - Linter pour la qualité du code

## Scripts disponibles

```bash
# Démarrage en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualisation du build
npm run preview

# Vérification des types TypeScript
npm run check-types

# Linting
npm run lint
```

## Structure du projet

```
src/
├── App.tsx          # Composant principal
├── main.tsx         # Point d'entrée
├── types/           # Définitions des types TypeScript
│   └── api.ts      # Types pour l'API
├── index.css       # Styles globaux
└── App.css         # Styles du composant App
```

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` avec :

```env
VITE_API_URL_LOCAL=http://localhost:3001
VITE_APP_NAME=LoL-Together
```

### Serveur de développement

Le serveur de développement démarre sur le port 3000 par défaut.

## API Integration

Les types TypeScript pour l'API backend sont définis dans `src/types/api.ts` et correspondent aux modèles du backend :

- `User` - Utilisateurs
- `Team` - Équipes
- `Message` - Messages
- `Conversation` - Conversations
- `Announce` - Annonces
