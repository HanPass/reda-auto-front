import { Injectable, inject } from '@angular/core';
import { Client } from '../core/models/types';
import { DemoStoreService } from '../core/services/demo-store.service';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private store = inject(DemoStoreService);
  clients$ = this.store.clients$;
  upsert(client: Client): void { this.store.upsertClient(client); }
  remove(id: number): void { this.store.removeClient(id); }
  getById(id: number): Client | undefined { return this.store.clients.find(client=>client.id===id); }
}
