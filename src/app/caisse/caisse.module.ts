import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaisseComponent } from './caisse.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [CaisseComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild([{ path: '', component: CaisseComponent }])]
})
export class CaisseModule {}
