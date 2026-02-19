import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produit } from '../core/models/types';

@Component({
  template: `
    <h2 mat-dialog-title>{{ data ? 'Modifier' : 'Nouveau' }} produit</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="grid">
        <mat-form-field><mat-label>Nom</mat-label><input matInput formControlName="nom"></mat-form-field>
        <mat-form-field><mat-label>Prix</mat-label><input matInput type="number" formControlName="prix"></mat-form-field>
        <mat-form-field><mat-label>Stock</mat-label><input matInput type="number" formControlName="stock"></mat-form-field>
        <mat-form-field><mat-label>Seuil alerte</mat-label><input matInput type="number" formControlName="seuilAlerte"></mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end"><button mat-button mat-dialog-close>Annuler</button><button mat-raised-button color="primary" (click)="save()">Enregistrer</button></mat-dialog-actions>
  `,
  styles: ['.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}']
})
export class ProduitDialogComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({ id: [0], nom: ['', Validators.required], prix: [0, Validators.required], stock: [0, Validators.required], seuilAlerte: [0, Validators.required] });

  constructor(private dialogRef: MatDialogRef<ProduitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Produit | null) {
    if (data) this.form.patchValue(data);
  }

  save(): void { if (this.form.valid) this.dialogRef.close(this.form.getRawValue() as Produit); }
}
