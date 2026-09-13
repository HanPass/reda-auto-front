import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProduitsComponent } from './produits.component';
import { ProduitDialogComponent } from './produit-dialog.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProduitDetailComponent } from './produit-detail.component';

@NgModule({
  declarations: [ProduitsComponent, ProduitDialogComponent, ProduitDetailComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild([{ path: '', component: ProduitsComponent }, { path: ':id', component: ProduitDetailComponent }])]
})
export class ProduitsModule {}
