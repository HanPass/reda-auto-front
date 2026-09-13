import { Injectable, inject } from '@angular/core';
import { Vente } from '../core/models/types';
import { DemoStoreService } from '../core/services/demo-store.service';

@Injectable({ providedIn: 'root' })
export class VentesService {
  private store = inject(DemoStoreService);
  ventes$ = this.store.sales$;
  addSale(sale: Vente): void { this.store.createSale(sale); }
}
