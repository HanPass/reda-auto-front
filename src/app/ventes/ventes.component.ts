import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../clients/clients.service';
import { ProduitsService } from '../produits/produits.service';
import { VentesService } from './ventes.service';

@Component({ templateUrl: './ventes.component.html' })
export class VentesComponent {
  private fb = inject(FormBuilder);
  private produitsService = inject(ProduitsService);
  private clientsService = inject(ClientsService);
  private ventesService = inject(VentesService);

  form = this.fb.group({ produitId: [null as number | null, Validators.required], qte: [1, Validators.required], mode: ['cash'], clientId: [null as number | null] });
  lignes: { produitId: number; nom: string; qte: number; prixUnitaire: number }[] = [];
  produits$ = this.produitsService.produits$;
  clients$ = this.clientsService.clients$;
  total = 0;

  addLigne(): void {
    const v = this.form.getRawValue();
    const produit = v.produitId ? this.produitsService.getById(v.produitId) : undefined;
    if (!produit || !v.qte) return;
    this.lignes.push({ produitId: produit.id, nom: produit.nom, qte: v.qte, prixUnitaire: produit.prix });
    this.total = this.lignes.reduce((sum, l) => sum + l.qte * l.prixUnitaire, 0);
  }

  valider(): void {
    const { mode, clientId } = this.form.getRawValue();
    if (mode === 'credit' && !clientId) return;
    this.ventesService.addSale({ items: this.lignes, total: this.total, mode: mode!, clientId: clientId ?? undefined });
    this.lignes = [];
    this.total = 0;
  }
}
