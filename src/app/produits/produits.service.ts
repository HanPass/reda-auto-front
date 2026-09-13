import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Produit } from '../core/models/types';
import { DemoStoreService } from '../core/services/demo-store.service';

@Injectable({ providedIn: 'root' })
export class ProduitsService {
  private store = inject(DemoStoreService);
  produits$ = this.store.products$;

  search(term: string): Observable<Produit[]> {
    return this.produits$.pipe(map((items) => items.filter((i) => i.nom.toLowerCase().includes(term.toLowerCase()))));
  }

  upsert(produit: Produit): void { this.store.upsertProduct(produit); }
  getById(id: number): Produit | undefined { return this.store.getProduct(id); }
  remove(id: number): void { this.store.removeProduct(id); }
}
