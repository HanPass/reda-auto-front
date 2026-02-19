import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../core/models/types';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private clientsSubject = new BehaviorSubject<Client[]>([
    { id: 1, nom: 'Garage Atlas', telephone: '0611111111', creditActuel: 1400, plafond: 1000 },
    { id: 2, nom: 'Auto Plus', telephone: '0622222222', creditActuel: 400, plafond: 3000 }
  ]);

  clients$ = this.clientsSubject.asObservable();

  upsert(client: Client): void {
    const clients = [...this.clientsSubject.value];
    const idx = clients.findIndex((c) => c.id === client.id);
    if (idx === -1) {
      clients.push({ ...client, id: Date.now() });
    } else {
      clients[idx] = client;
    }
    this.clientsSubject.next(clients);
  }

  remove(id: number): void {
    this.clientsSubject.next(this.clientsSubject.value.filter((c) => c.id !== id));
  }
}
