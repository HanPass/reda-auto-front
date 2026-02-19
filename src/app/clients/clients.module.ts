import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientDialogComponent } from './client-dialog.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [ClientsComponent, ClientDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild([{ path: '', component: ClientsComponent }])]
})
export class ClientsModule {}
