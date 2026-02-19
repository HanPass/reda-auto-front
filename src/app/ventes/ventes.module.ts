import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VentesComponent } from './ventes.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [VentesComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild([{ path: '', component: VentesComponent }])]
})
export class VentesModule {}
