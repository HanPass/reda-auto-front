import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../core/models/types';

@Component({
  template: `
    <h2 mat-dialog-title>Client</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="grid">
        <mat-form-field><mat-label>Nom</mat-label><input matInput formControlName="nom"></mat-form-field>
        <mat-form-field><mat-label>Téléphone</mat-label><input matInput formControlName="telephone"></mat-form-field>
        <mat-form-field><mat-label>Crédit</mat-label><input type="number" matInput formControlName="creditActuel"></mat-form-field>
        <mat-form-field><mat-label>Plafond</mat-label><input type="number" matInput formControlName="plafond"></mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end"><button mat-button mat-dialog-close>Annuler</button><button mat-raised-button color="primary" (click)="save()">Valider</button></mat-dialog-actions>
  `,
  styles: ['.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}']
})
export class ClientDialogComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({ id: [0], nom: ['', Validators.required], telephone: ['', Validators.required], creditActuel: [0], plafond: [0] });

  constructor(private dialogRef: MatDialogRef<ClientDialogComponent>, @Inject(MAT_DIALOG_DATA) data: Client | null) {
    if (data) this.form.patchValue(data);
  }

  save(): void { if (this.form.valid) this.dialogRef.close(this.form.getRawValue() as Client); }
}
