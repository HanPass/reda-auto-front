import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { Produit } from '../core/models/types';
import { ProduitsService } from './produits.service';
import { ProduitDialogComponent } from './produit-dialog.component';

@Component({ templateUrl: './produits.component.html' })
export class ProduitsComponent {
  private service = inject(ProduitsService);
  private dialog = inject(MatDialog);

  displayedColumns = ['nom', 'prix', 'stock', 'actions'];
  search$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<number>(0);
  pageSize = 5;

  produits$ = combineLatest([this.service.produits$, this.search$, this.page$]).pipe(
    map(([items, term, page]) => {
      const filtered = items.filter((i) => i.nom.toLowerCase().includes(term.toLowerCase()));
      return filtered.slice(page * this.pageSize, (page + 1) * this.pageSize);
    }),
    startWith([] as Produit[])
  );

  onSearch(value: string): void { this.search$.next(value); this.page$.next(0); }
  pageChange(index: number): void { this.page$.next(index); }

  openDialog(produit?: Produit): void {
    this.dialog.open(ProduitDialogComponent, { data: produit ?? null }).afterClosed().subscribe((result?: Produit) => { if (result) this.service.upsert(result); });
  }
  delete(id: number): void { this.service.remove(id); }
}
