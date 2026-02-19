export type UserRole = 'ADMIN' | 'VENDEUR' | 'CAISSIER';

export interface AppUser {
  username: string;
  role: UserRole;
  token: string;
}

export interface Produit {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  seuilAlerte: number;
}

export interface Client {
  id: number;
  nom: string;
  telephone: string;
  creditActuel: number;
  plafond: number;
}

export interface VenteItem {
  produitId: number;
  nom: string;
  qte: number;
  prixUnitaire: number;
}
