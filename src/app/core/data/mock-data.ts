import { Client, Fournisseur, Produit, PurchaseOrder, StockMovement, Vente } from '../models/types';

const vehicles = [
  { marque: 'Renault', modele: 'Clio IV', generation: 'X98', anneeDebut: 2012, anneeFin: 2019, motorisation: '1.5 dCi 90', carburant: 'Diesel' as const, codeMoteur: 'K9K' },
  { marque: 'Dacia', modele: 'Logan II', generation: 'L52', anneeDebut: 2013, anneeFin: 2020, motorisation: '1.5 dCi 90', carburant: 'Diesel' as const, codeMoteur: 'K9K' },
  { marque: 'Peugeot', modele: '208 I', generation: 'A9', anneeDebut: 2012, anneeFin: 2019, motorisation: '1.6 BlueHDi 100', carburant: 'Diesel' as const, codeMoteur: 'DV6FD' },
  { marque: 'Citroën', modele: 'C3 III', generation: 'SX', anneeDebut: 2016, anneeFin: 2023, motorisation: '1.2 PureTech 82', carburant: 'Essence' as const, codeMoteur: 'HMZ' },
  { marque: 'Volkswagen', modele: 'Golf VII', generation: '5G', anneeDebut: 2012, anneeFin: 2020, motorisation: '2.0 TDI 150', carburant: 'Diesel' as const, codeMoteur: 'CRBC' },
  { marque: 'Volkswagen', modele: 'Tiguan II', generation: 'AD1', anneeDebut: 2016, anneeFin: 2024, motorisation: '2.0 TDI 150', carburant: 'Diesel' as const, codeMoteur: 'DFGA' },
  { marque: 'Toyota', modele: 'Corolla XII', generation: 'E210', anneeDebut: 2019, anneeFin: 2026, motorisation: '1.8 Hybrid', carburant: 'Hybride' as const, codeMoteur: '2ZR-FXE' },
  { marque: 'Hyundai', modele: 'i30 III', generation: 'PD', anneeDebut: 2017, anneeFin: 2024, motorisation: '1.6 CRDi 110', carburant: 'Diesel' as const, codeMoteur: 'D4FB' }
];

const specs: Array<[string, string, string, string, string, number, number, number, number, string]> = [
  ['Filtre à huile', 'Filtration', 'MANN-FILTER', 'W 75/3', '7700274177', 42, 69, 24, 8, 'A-01-01'], ['Filtre à air', 'Filtration', 'PURFLUX', 'A1236', '165467674R', 58, 95, 14, 6, 'A-01-02'],
  ['Filtre à carburant', 'Filtration', 'BOSCH', 'F026402825', '164039594R', 135, 220, 7, 5, 'A-01-03'], ['Filtre habitacle', 'Filtration', 'MAHLE', 'LAK 888', '272773016R', 65, 110, 18, 6, 'A-01-04'],
  ['Plaquettes de frein avant', 'Freinage', 'BREMBO', 'P68033', '410608481R', 210, 345, 12, 6, 'B-02-01'], ['Disques de frein avant', 'Freinage', 'TRW', 'DF6186', '402064151R', 480, 760, 4, 4, 'B-02-02'],
  ['Mâchoires de frein arrière', 'Freinage', 'FERODO', 'FSB4179', '440605713R', 260, 420, 0, 3, 'B-02-03'], ['Liquide de frein DOT 4', 'Freinage', 'BOSCH', '1987479107', 'DOT4-1L', 45, 75, 20, 8, 'B-02-04'],
  ['Kit distribution', 'Distribution', 'GATES', 'K015671XS', '130C17529R', 520, 820, 5, 3, 'C-03-01'], ['Pompe à eau', 'Refroidissement', 'SKF', 'VKPC86416', '210105296R', 280, 450, 8, 4, 'C-03-02'],
  ['Courroie accessoires', 'Distribution', 'CONTITECH', '6PK1200', '117202495R', 95, 155, 15, 5, 'C-03-03'], ['Galet tendeur', 'Distribution', 'INA', '534055410', '119233042R', 175, 285, 6, 4, 'C-03-04'],
  ['Amortisseur avant', 'Suspension et direction', 'MONROE', 'G7397', '543021071R', 390, 620, 9, 4, 'D-04-01'], ['Rotule de direction', 'Suspension et direction', 'LEMFÖRDER', '3891101', '485200410R', 120, 195, 11, 5, 'D-04-02'],
  ['Triangle de suspension', 'Suspension et direction', 'SASIC', '7474018', '545046817R', 310, 510, 3, 3, 'D-04-03'], ['Roulement de roue', 'Suspension et direction', 'SNR', 'R155.75', '402109533R', 245, 390, 6, 4, 'D-04-04'],
  ['Kit embrayage', 'Embrayage et transmission', 'LUK', '620342600', '302052965R', 980, 1490, 3, 2, 'E-05-01'], ['Butée embrayage', 'Embrayage et transmission', 'SACHS', '3182600203', '306206822R', 310, 495, 7, 3, 'E-05-02'],
  ['Cardan avant gauche', 'Embrayage et transmission', 'SKF', 'VKJC8160', '391019698R', 720, 1090, 2, 2, 'E-05-03'], ['Huile boîte 75W80', 'Huiles et consommables', 'TOTALENERGIES', 'TRAXIUM-1L', '75W80-1L', 68, 105, 17, 6, 'H-08-01'],
  ['Batterie 70Ah', 'Électricité et éclairage', 'VARTA', 'E11', '570409064', 780, 1090, 6, 3, 'F-06-01'], ['Alternateur 150A', 'Électricité et éclairage', 'VALEO', '440804', '231007865R', 1450, 2090, 1, 2, 'F-06-02'],
  ['Démarreur', 'Électricité et éclairage', 'BOSCH', '0001107426', '233000779R', 980, 1480, 3, 2, 'F-06-03'], ['Bougies préchauffage x4', 'Électricité et éclairage', 'NGK', '97256', '8200682592', 260, 420, 10, 4, 'F-06-04'],
  ['Ampoule H7', 'Électricité et éclairage', 'PHILIPS', '12972PRC1', 'H7-12V-55W', 28, 49, 32, 10, 'F-06-05'], ['Phare avant droit', 'Électricité et éclairage', 'VALEO', '045418', '260102184R', 1150, 1790, 1, 2, 'F-06-06'],
  ['Radiateur moteur', 'Refroidissement', 'NISSENS', '639761', '214100078R', 760, 1190, 4, 2, 'G-07-01'], ['Thermostat', 'Refroidissement', 'VERNET', 'TH6977.89J', '110600686R', 145, 235, 7, 4, 'G-07-02'],
  ['Vase expansion', 'Refroidissement', 'FEBI', '102287', '217104354R', 155, 250, 5, 3, 'G-07-03'], ['Liquide refroidissement 5L', 'Refroidissement', 'MOTUL', 'AUTOCOOL-G12', 'G12-5L', 92, 145, 21, 7, 'G-07-04'],
  ['Huile moteur 5W30 5L', 'Huiles et consommables', 'CASTROL', 'EDGE-5W30-5L', 'ACEA-C3-5L', 290, 430, 26, 8, 'H-08-02'], ['Nettoyant frein 500ml', 'Huiles et consommables', 'BARDHAL', '4452', 'BRAKE-500', 32, 55, 30, 10, 'H-08-03'],
  ['Balais essuie-glace', 'Carrosserie', 'BOSCH', 'A863S', '288903088R', 145, 235, 13, 5, 'I-09-01'], ['Rétroviseur gauche', 'Carrosserie', 'TYC', '328-0193', '963029114R', 390, 625, 2, 2, 'I-09-02'],
  ['Pare-boue avant droit', 'Carrosserie', 'VAN WEZEL', '4383434', '638409777R', 130, 220, 8, 3, 'I-09-03'], ['Support moteur', 'Moteur', 'HUTCHINSON', '538A45', '112203734R', 250, 410, 4, 3, 'J-10-01'],
  ['Débitmètre d’air', 'Moteur', 'PIERBURG', '722684080', '8200682558', 490, 760, 2, 2, 'J-10-02'], ['Vanne EGR', 'Moteur', 'WAHLER', '710910D', '147107974R', 690, 1050, 0, 2, 'J-10-03'],
  ['Injecteur diesel', 'Moteur', 'DELPHI', 'R05101D', '166009384R', 1250, 1890, 4, 2, 'J-10-04'], ['Joint de culasse', 'Moteur', 'ELRING', '734.960', '110449231R', 230, 375, 6, 3, 'J-10-05']
];

export const MOCK_PRODUCTS: Produit[] = specs.map((s, index) => ({
  id: index + 1, reference: `RA-${String(index + 1).padStart(4, '0')}`, nom: s[0], description: `${s[0]} ${s[3]} – qualité professionnelle`, categorie: s[1], marque: s[2],
  referenceEquipementier: s[3], referencesOem: [s[4]], codeBarres: `61100000${String(index + 1).padStart(5, '0')}`,
  unite: s[0].includes('x4') ? 'Jeu' : s[0].includes('Kit') ? 'Kit' : s[0].includes('Huile') || s[0].includes('Liquide') ? 'Bidon' : 'Pièce', qualite: index % 4 === 0 ? 'Premium' : 'Standard',
  prixAchat: s[5], prix: s[6], stock: s[7], stockReserve: index % 5 === 0 ? 2 : index % 3 === 0 ? 1 : 0, seuilAlerte: s[8], emplacement: s[9], actif: true,
  compatibilites: [vehicles[index % vehicles.length], vehicles[(index + 1) % vehicles.length]], fournisseurs: [{ fournisseurId: (index % 8) + 1, reference: `FO-${s[3]}`, prixAchat: s[5], delaiJours: 2 + index % 7, principal: true }]
}));

const clientTypes: Client['type'][] = ['Particulier', 'Garage', 'Mécanicien', 'Entreprise', 'Revendeur'];
const clientNames = ['Garage Atlas', 'Auto Service Rabat', 'Karim El Amrani', 'Mécanique Pro', 'Taxi Salé', 'Pièces Express', 'Sophie Martin', 'Garage de la Gare', 'Nadia Benali', 'Flotte Horizon', 'Auto Tech', 'Marc Dubois', 'Carrosserie Océan', 'Youssef Alaoui', 'Transport Nord'];
export const MOCK_CLIENTS: Client[] = clientNames.map((nom, index) => ({ id: index + 1, nom, type: clientTypes[index % clientTypes.length], telephone: `06${String(11000000 + index * 713).slice(-8)}`, email: `client${index + 1}@example.test`, ville: index % 2 ? 'Salé' : 'Rabat', creditActuel: index % 4 === 0 ? 1200 + index * 80 : 0, plafond: index % 3 === 0 ? 5000 : 2000, vehicules: index % 2 === 0 ? [{ immatriculation: `${12345 + index}-A-6`, marque: vehicles[index % 8].marque, modele: vehicles[index % 8].modele, annee: 2018 + index % 6, motorisation: vehicles[index % 8].motorisation }] : [] }));

const supplierNames = ['Auto Distribution Maroc', 'Maghreb Parts', 'Bosch Car Service Supply', 'Alliance Automotive', 'VAG Parts Pro', 'Renault Parts Center', 'Eurorepar Distribution', 'Japan Auto Parts'];
export const MOCK_SUPPLIERS: Fournisseur[] = supplierNames.map((nom, index) => ({ id: index + 1, nom, telephone: `05${String(37000000 + index * 427).slice(-8)}`, email: `contact${index + 1}@supplier.test`, ville: ['Casablanca', 'Rabat', 'Kénitra', 'Tanger'][index % 4], marques: [specs[index][2], specs[(index + 8) % specs.length][2]], delaiMoyen: 2 + index, conditionsPaiement: index % 2 ? '30 jours' : 'Comptant' }));

export const MOCK_SALES: Vente[] = Array.from({ length: 20 }, (_, index) => { const product = MOCK_PRODUCTS[index]; const qte = index % 3 + 1; const sousTotal = product.prix * qte; return { id: index + 1, numero: `V-2026-${String(index + 1).padStart(4, '0')}`, date: new Date(2026, 8, 13 - index).toISOString(), clientId: index % 3 ? MOCK_CLIENTS[index % 15].id : undefined, clientNom: index % 3 ? MOCK_CLIENTS[index % 15].nom : 'Client comptoir', vendeur: index % 2 ? 'reda' : 'caisse', items: [{ produitId: product.id, reference: product.reference, nom: product.nom, qte, prixUnitaire: product.prix, remise: index % 5 === 0 ? 5 : 0 }], sousTotal, taxe: sousTotal * .2, total: sousTotal * 1.2, mode: index % 4 === 0 ? 'CREDIT' : index % 2 ? 'CARTE' : 'ESPECES', statut: index % 4 === 0 ? 'PARTIELLEMENT_REGLEE' : 'REGLEE' }; });
export const MOCK_MOVEMENTS: StockMovement[] = Array.from({ length: 40 }, (_, index) => { const product = MOCK_PRODUCTS[index]; const out = index % 3 !== 0; return { id: index + 1, date: new Date(2026, 8, 13 - index).toISOString(), type: out ? 'VENTE' : 'RECEPTION', produitId: product.id, reference: product.reference, produitNom: product.nom, quantite: out ? -1 - index % 2 : 5 + index % 6, stockApres: product.stock, motif: out ? 'Vente comptoir' : 'Réception fournisseur', document: out ? `V-2026-${String(index + 1).padStart(4, '0')}` : `BR-${String(index + 1).padStart(4, '0')}`, utilisateur: index % 2 ? 'reda' : 'magasinier' }; });
export const MOCK_ORDERS: PurchaseOrder[] = Array.from({ length: 8 }, (_, index) => { const product = MOCK_PRODUCTS[index * 3]; const qte = 5 + index; return { id: index + 1, numero: `CF-2026-${String(index + 1).padStart(3, '0')}`, fournisseurId: index + 1, fournisseurNom: MOCK_SUPPLIERS[index].nom, date: new Date(2026, 8, 3 + index).toISOString(), livraisonPrevue: new Date(2026, 8, 16 + index).toISOString(), statut: ['BROUILLON', 'ENVOYEE', 'CONFIRMEE', 'PARTIELLEMENT_RECUE', 'RECUE', 'CONFIRMEE', 'ENVOYEE', 'BROUILLON'][index] as PurchaseOrder['statut'], lignes: [{ produitId: product.id, reference: product.reference, nom: product.nom, quantite: qte, quantiteRecue: index === 3 ? 2 : index === 4 ? qte : 0, prixAchat: product.prixAchat }], total: qte * product.prixAchat }; });
