# Reda Auto Front

Frontend Angular 17+ pour une application locale de gestion de stock de pièces automobiles.

## Stack
- Angular 17+
- Angular Material
- RxJS
- Reactive Forms
- SCSS
- Architecture modulaire par domaine

## Modules
- `core` (guards, interceptors JWT + erreurs globales, modèles, notifications)
- `shared` (module Angular Material)
- `auth` (login + gestion JWT localStorage)
- `dashboard`
- `produits`
- `fournisseurs`
- `clients`
- `ventes`
- `credit`
- `caisse`

## Lancement
```bash
npm install
npm start
```

Application disponible sur `http://localhost:4200`.

## Comptes de test (login)
- `admin` → rôle `ADMIN`
- `caisse` → rôle `CAISSIER`
- autre username → rôle `VENDEUR`

## Fonctionnalités incluses
- Authentification locale avec token JWT simulé (`localStorage`)
- Interceptor JWT pour ajouter `Authorization: Bearer ...`
- Interceptor global d'erreur avec snackbar
- AuthGuard + RoleGuard
- Produits: liste paginée, recherche dynamique, badge alerte stock, CRUD via dialog
- Clients: CRUD + badge plafond crédit dépassé
- Ventes: interface POS simple, total auto, mode paiement, client obligatoire pour crédit
- Crédit: débiteurs, remboursement, historique
- Caisse: ouvrir, solde live, dépense, fermer, calcul écart
- Dashboard: cartes KPI + zone graphique
- Mode sombre activable
- UI responsive tablette
