import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FournisseursComponent } from './fournisseurs.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [FournisseursComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild([{ path: '', component: FournisseursComponent }])]
})
export class FournisseursModule {}
