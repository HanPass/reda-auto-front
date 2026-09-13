import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../clients/clients.service';
import { ProduitsService } from '../produits/produits.service';
import { VentesService } from './ventes.service';
import { CountryService } from '../core/services/country.service';
import { Produit, VenteItem } from '../core/models/types';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ templateUrl: './ventes.component.html', styleUrl: './ventes.component.scss' })
export class VentesComponent {
  private fb = inject(FormBuilder);
  private produitsService = inject(ProduitsService);
  private clientsService = inject(ClientsService);
  private ventesService = inject(VentesService);
  private route = inject(ActivatedRoute);
  private snack = inject(MatSnackBar);
  country = inject(CountryService);

  form = this.fb.group({ produitId: [null as number | null, Validators.required], qte: [1, [Validators.required, Validators.min(1)]], remise: [0, [Validators.min(0), Validators.max(30)]], mode: ['ESPECES'], clientId: [null as number | null] });
  lignes: VenteItem[] = [];
  produits$ = this.produitsService.produits$;
  clients$ = this.clientsService.clients$;
  productSearch = '';
  selectedProduct?: Produit;

  constructor() { const id=Number(this.route.snapshot.queryParamMap.get('produit')); if(id){this.form.patchValue({produitId:id});this.selectedProduct=this.produitsService.getById(id);} }
  get sousTotal(): number { return this.lignes.reduce((sum,l)=>sum+l.qte*l.prixUnitaire*(1-l.remise/100),0); }
  get taxe(): number { return this.sousTotal*this.country.config.taxRate; }
  get total(): number { return this.sousTotal+this.taxe; }
  get available(): number { return this.selectedProduct ? this.selectedProduct.stock-this.selectedProduct.stockReserve : 0; }
  selectProduct(id: number): void { this.selectedProduct=this.produitsService.getById(id); }

  addLigne(): void {
    const v = this.form.getRawValue();
    const produit = v.produitId ? this.produitsService.getById(v.produitId) : undefined;
    if (!produit || !v.qte) return;
    const existing=this.lignes.find(l=>l.produitId===produit.id); const requested=(existing?.qte||0)+v.qte;
    if(requested>produit.stock-produit.stockReserve){this.snack.open(`Stock insuffisant : ${produit.stock-produit.stockReserve} disponible(s)`,'Fermer',{duration:3500});return;}
    if(existing){existing.qte=requested;existing.remise=v.remise||0;}else{this.lignes.push({ produitId: produit.id, reference: produit.reference, nom: produit.nom, qte: v.qte, prixUnitaire: produit.prix, remise:v.remise||0 });}
    this.form.patchValue({qte:1,remise:0});
  }

  changeQuantity(line: VenteItem, delta: number): void { const product=this.produitsService.getById(line.produitId); const next=line.qte+delta; if(next<=0){this.removeLine(line);return;} if(product&&next<=product.stock-product.stockReserve)line.qte=next; }
  removeLine(line: VenteItem): void { this.lignes=this.lignes.filter(item=>item!==line); }

  valider(): void {
    const { mode, clientId } = this.form.getRawValue();
    if(!this.lignes.length){this.snack.open('Ajoutez au moins une pièce','Fermer',{duration:3000});return;}
    if (mode === 'CREDIT' && !clientId){this.snack.open('Un client est obligatoire pour une vente à crédit','Fermer',{duration:3500});return;}
    const client=this.clientsService.getById(clientId||0); const now=Date.now();
    try { this.ventesService.addSale({id:now,numero:`V-2026-${String(now).slice(-5)}`,date:new Date().toISOString(),clientId:clientId||undefined,clientNom:client?.nom||'Client comptoir',vendeur:localStorage.getItem('username')||'vendeur',items:[...this.lignes],sousTotal:this.sousTotal,taxe:this.taxe,total:this.total,mode:mode as any,statut:mode==='CREDIT'?'PARTIELLEMENT_REGLEE':'REGLEE'}); this.lignes=[]; this.snack.open('Vente validée et stock mis à jour','Fermer',{duration:4000}); }
    catch(error){this.snack.open((error as Error).message,'Fermer',{duration:4000});}
  }
}
