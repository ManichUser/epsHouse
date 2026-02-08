# 🏠 Logement Cameroun - MVP

Plateforme communautaire de recherche de logements au Cameroun.

## 🚀 Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (local) avec Prisma ORM
- **Images**: Cloudinary
- **Styling**: Tailwind CSS (mobile-first)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Configurer Cloudinary
# 1. Créez un compte sur https://cloudinary.com
# 2. Copiez .env.example vers .env
# 3. Remplissez vos credentials Cloudinary

# Générer le client Prisma
npm run prisma:generate

# Pousser le schéma vers la DB
npm run prisma:push
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir Prisma Studio (visualiser la DB)
npm run prisma:studio
```

## 📁 Structure

```
logement-mvp/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Composants React
│   │   ├── ui/          # Composants UI atomiques
│   │   └── features/    # Composants métier
│   ├── lib/             # Configurations & utils
│   └── types/           # Types TypeScript
├── prisma/
│   └── schema.prisma    # Schéma de base de données
└── public/              # Assets statiques
```

## 🎯 Conventions

- **Fichiers**: kebab-case
- **Composants**: PascalCase
- **Fonctions/variables**: camelCase
- **Types**: PascalCase avec suffix

# epsHouse
