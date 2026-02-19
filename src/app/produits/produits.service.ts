import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Produit } from '../core/models/types';

@Injectable({ providedIn: 'root' })
export class ProduitsService {
  private produitsSubject = new BehaviorSubject<Produit[]>([
    { id: 1, nom: 'Filtre à huile', prix: 65, stock: 4, seuilAlerte: 5 },
    { id: 2, nom: 'Plaquette frein', prix: 320, stock: 18, seuilAlerte: 6 }
  ]);

  produits$ = this.produitsSubject.asObservable();

  search(term: string): Observable<Produit[]> {
    return this.produits$.pipe(map((items) => items.filter((i) => i.nom.toLowerCase().includes(term.toLowerCase()))));
  }

  upsert(produit: Produit): void {
    const items = [...this.produitsSubject.value];
    const index = items.findIndex((p) => p.id === produit.id);
    if (index === -1) {
      items.push({ ...produit, id: Date.now() });
    } else {
      items[index] = produit;
    }
    this.produitsSubject.next(items);
  }

  getById(id: number): Produit | undefined {
    return this.produitsSubject.value.find((p) => p.id === id);
  }

  remove(id: number): void {
    this.produitsSubject.next(this.produitsSubject.value.filter((p) => p.id !== id));
  }
}
