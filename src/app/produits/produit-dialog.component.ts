import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produit } from '../core/models/types';

@Component({
  template: `
    <h2 mat-dialog-title>{{ data ? 'Modifier la pièce' : 'Nouvelle pièce' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="grid">
        <mat-form-field><mat-label>Référence interne</mat-label><input matInput formControlName="reference" placeholder="Générée si vide"></mat-form-field>
        <mat-form-field><mat-label>Désignation</mat-label><input matInput formControlName="nom"></mat-form-field>
        <mat-form-field><mat-label>Marque</mat-label><input matInput formControlName="marque"></mat-form-field>
        <mat-form-field><mat-label>Catégorie</mat-label><mat-select formControlName="categorie"><mat-option *ngFor="let c of categories" [value]="c">{{c}}</mat-option></mat-select></mat-form-field>
        <mat-form-field><mat-label>Référence équipementier</mat-label><input matInput formControlName="referenceEquipementier"></mat-form-field>
        <mat-form-field><mat-label>Références OEM</mat-label><input matInput formControlName="oem" placeholder="Séparées par des virgules"></mat-form-field>
        <mat-form-field><mat-label>Code-barres / EAN</mat-label><input matInput formControlName="codeBarres"></mat-form-field>
        <mat-form-field><mat-label>Unité</mat-label><mat-select formControlName="unite"><mat-option *ngFor="let u of units" [value]="u">{{u}}</mat-option></mat-select></mat-form-field>
        <mat-form-field><mat-label>Prix d'achat</mat-label><input matInput type="number" formControlName="prixAchat"></mat-form-field>
        <mat-form-field><mat-label>Prix de vente HT</mat-label><input matInput type="number" formControlName="prix"></mat-form-field>
        <mat-form-field><mat-label>Stock physique</mat-label><input matInput type="number" formControlName="stock"></mat-form-field>
        <mat-form-field><mat-label>Stock réservé</mat-label><input matInput type="number" formControlName="stockReserve"></mat-form-field>
        <mat-form-field><mat-label>Seuil d'alerte</mat-label><input matInput type="number" formControlName="seuilAlerte"></mat-form-field>
        <mat-form-field><mat-label>Emplacement</mat-label><input matInput formControlName="emplacement" placeholder="A-01-01"></mat-form-field>
        <mat-form-field class="wide"><mat-label>Description</mat-label><textarea matInput rows="2" formControlName="description"></textarea></mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end"><button mat-button mat-dialog-close>Annuler</button><button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Enregistrer</button></mat-dialog-actions>
  `,
  styles: ['.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;padding-top:8px}.wide{grid-column:1/-1}@media(max-width:600px){.grid{grid-template-columns:1fr}}']
})
export class ProduitDialogComponent {
  private fb = inject(FormBuilder);
  categories = ['Freinage','Filtration','Moteur','Distribution','Suspension et direction','Embrayage et transmission','Électricité et éclairage','Refroidissement','Carrosserie','Huiles et consommables'];
  units: Produit['unite'][] = ['Pièce','Paire','Jeu','Kit','Litre','Bidon'];
  form = this.fb.group({ id: [0], reference: [''], nom: ['', Validators.required], description: [''], marque: ['', Validators.required], categorie: ['', Validators.required], referenceEquipementier: ['', Validators.required], oem: [''], codeBarres: [''], unite: ['Pièce' as Produit['unite']], prixAchat: [0, [Validators.required, Validators.min(0)]], prix: [0, [Validators.required, Validators.min(0)]], stock: [0, [Validators.required, Validators.min(0)]], stockReserve: [0, [Validators.required, Validators.min(0)]], seuilAlerte: [0, [Validators.required, Validators.min(0)]], emplacement: ['', Validators.required] });

  constructor(private dialogRef: MatDialogRef<ProduitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Produit | null) {
    if (data) this.form.patchValue({ ...data, oem: data.referencesOem.join(', ') });
  }

  save(): void { if (this.form.valid) { const value=this.form.getRawValue(); this.dialogRef.close({ ...this.data, ...value, referencesOem: (value.oem || '').split(',').map(v=>v.trim()).filter(Boolean), qualite: this.data?.qualite || 'Standard', actif: this.data?.actif ?? true, compatibilites: this.data?.compatibilites || [], fournisseurs: this.data?.fournisseurs || [] } as Produit); } }
}
