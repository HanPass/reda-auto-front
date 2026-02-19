import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from './clients.service';
import { Client } from '../core/models/types';
import { ClientDialogComponent } from './client-dialog.component';

@Component({ templateUrl: './clients.component.html' })
export class ClientsComponent {
  private service = inject(ClientsService);
  private dialog = inject(MatDialog);

  displayedColumns = ['nom', 'telephone', 'credit', 'actions'];
  clients$ = this.service.clients$;

  open(client?: Client): void {
    this.dialog.open(ClientDialogComponent, { data: client ?? null }).afterClosed().subscribe((value?: Client) => { if (value) this.service.upsert(value); });
  }
  remove(id: number): void { this.service.remove(id); }
}
