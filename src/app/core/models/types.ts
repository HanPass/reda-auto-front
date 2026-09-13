export type UserRole = 'ADMIN' | 'GERANT' | 'VENDEUR' | 'MAGASINIER' | 'CAISSIER';
export type CountryCode = 'MA' | 'FR';
export type StockStatus = 'EN_STOCK' | 'STOCK_FAIBLE' | 'RUPTURE' | 'SUR_COMMANDE';
export type PaymentMode = 'ESPECES' | 'CARTE' | 'VIREMENT' | 'MIXTE' | 'CREDIT';

export interface AppUser { username: string; role: UserRole; token: string; }
export interface CountryConfig { code: CountryCode; label: string; currency: 'MAD' | 'EUR'; locale: string; taxRate: number; taxLabel: string; addressHint: string; paymentModes: PaymentMode[]; }
export interface VehicleCompatibility { marque: string; modele: string; generation: string; anneeDebut: number; anneeFin: number; motorisation: string; carburant: 'Essence' | 'Diesel' | 'Hybride'; codeMoteur: string; }
export interface SupplierOffer { fournisseurId: number; reference: string; prixAchat: number; delaiJours: number; principal: boolean; }

export interface Produit {
  id: number; reference: string; nom: string; description: string; marque: string; categorie: string;
  referenceEquipementier: string; referencesOem: string[]; codeBarres: string;
  unite: 'Pièce' | 'Paire' | 'Jeu' | 'Kit' | 'Litre' | 'Bidon'; qualite: 'Économique' | 'Standard' | 'Premium' | 'Origine';
  prixAchat: number; prix: number; stock: number; stockReserve: number; seuilAlerte: number; emplacement: string; actif: boolean;
  compatibilites: VehicleCompatibility[]; fournisseurs: SupplierOffer[];
}

export interface ClientVehicle { immatriculation: string; vin?: string; marque: string; modele: string; annee: number; motorisation: string; }
export interface Client {
  id: number; nom: string; type: 'Particulier' | 'Garage' | 'Mécanicien' | 'Entreprise' | 'Revendeur'; telephone: string;
  email: string; ville: string; creditActuel: number; plafond: number; vehicules: ClientVehicle[];
}
export interface Fournisseur { id: number; nom: string; telephone: string; email: string; ville: string; marques: string[]; delaiMoyen: number; conditionsPaiement: string; }
export interface VenteItem { produitId: number; reference: string; nom: string; qte: number; prixUnitaire: number; remise: number; }
export interface Vente { id: number; numero: string; date: string; clientId?: number; clientNom: string; vendeur: string; items: VenteItem[]; sousTotal: number; taxe: number; total: number; mode: PaymentMode; statut: 'VALIDEE' | 'PARTIELLEMENT_REGLEE' | 'REGLEE' | 'ANNULEE' | 'REMBOURSEE'; }
export interface StockMovement { id: number; date: string; type: 'STOCK_INITIAL' | 'RECEPTION' | 'VENTE' | 'RETOUR_CLIENT' | 'RETOUR_FOURNISSEUR' | 'CORRECTION' | 'INVENTAIRE' | 'CASSE'; produitId: number; reference: string; produitNom: string; quantite: number; stockApres: number; motif: string; document: string; utilisateur: string; }
export interface PurchaseOrderLine { produitId: number; reference: string; nom: string; quantite: number; quantiteRecue: number; prixAchat: number; }
export interface PurchaseOrder { id: number; numero: string; fournisseurId: number; fournisseurNom: string; date: string; livraisonPrevue: string; statut: 'BROUILLON' | 'ENVOYEE' | 'CONFIRMEE' | 'PARTIELLEMENT_RECUE' | 'RECUE' | 'ANNULEE'; lignes: PurchaseOrderLine[]; total: number; }
