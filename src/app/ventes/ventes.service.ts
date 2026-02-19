import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VenteItem } from '../core/models/types';

@Injectable({ providedIn: 'root' })
export class VentesService {
  private salesSubject = new BehaviorSubject<{ items: VenteItem[]; total: number; mode: string; clientId?: number }[]>([]);
  ventes$ = this.salesSubject.asObservable();

  addSale(sale: { items: VenteItem[]; total: number; mode: string; clientId?: number }): void {
    this.salesSubject.next([...this.salesSubject.value, sale]);
  }
}
