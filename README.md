# Reda Auto Front

Prototype frontend Angular 17 de gestion d'un magasin de pièces détachées automobiles. Cette phase fonctionne sans backend : les données de démonstration sont centralisées dans un store local et persistées dans `localStorage`.

## Stack
- Angular 17+
- Angular Material
- RxJS
- Reactive Forms
- SCSS
- Architecture modulaire par domaine

## Parcours disponibles

- Tableau de bord et indicateurs métier
- Catalogue de 40 pièces avec références OEM, équipementiers et compatibilités véhicule
- Fiche détaillée et formulaire d'une pièce
- Vente comptoir avec panier, remise, taxes, paiement et contrôle du stock
- Historique des ventes et retour total avec remise en stock
- Stock physique, réservé et disponible, mouvements et corrections tracées
- Commandes fournisseurs et réception avec mise à jour du stock
- Clients, fournisseurs, crédits et caisse
- Rapports et paramètres
- Mode Maroc (MAD) / France (EUR)
- Interface responsive ordinateur, tablette et mobile

## Lancement
```bash
npm install
npm start
```

Application disponible sur `http://localhost:4200`.

## Déploiement Cloudflare Workers

Le fichier `wrangler.jsonc` publie le build Angular comme une SPA statique :

```bash
npm run build
npx wrangler deploy
```

Le fallback SPA permet d'ouvrir directement les routes telles que `/produits` ou `/stock` sans erreur 404.

## Comptes de démonstration
- `admin` → rôle `ADMIN`
- `caisse` → rôle `CAISSIER`
- autre identifiant → rôle `VENDEUR`

N'importe quel mot de passe non vide est accepté dans ce prototype.

## Données locales

Les créations, ventes, réceptions et corrections sont conservées dans le navigateur. Le bouton **Réinitialiser les données** dans Paramètres restaure le jeu initial.

Ces données et les paramètres fiscaux sont uniquement destinés à valider l'interface. Ils ne constituent pas des documents comptables ou fiscaux réels.
