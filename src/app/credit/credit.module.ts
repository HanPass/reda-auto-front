import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreditComponent } from './credit.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [CreditComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild([{ path: '', component: CreditComponent }])]
})
export class CreditModule {}
