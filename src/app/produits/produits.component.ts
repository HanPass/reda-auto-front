import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Produit } from '../core/models/types';
import { ProduitsService } from './produits.service';
import { ProduitDialogComponent } from './produit-dialog.component';
import { CountryService } from '../core/services/country.service';

@Component({ templateUrl: './produits.component.html', styleUrl: './produits.component.scss' })
export class ProduitsComponent {
  private service = inject(ProduitsService);
  private dialog = inject(MatDialog);
  country = inject(CountryService);

  displayedColumns = ['reference', 'nom', 'marque', 'oem', 'prix', 'stock', 'emplacement', 'actions'];
  search$ = new BehaviorSubject<string>('');
  category$ = new BehaviorSubject<string>('');
  status$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<number>(0);
  pageSize = 10;
  categories: string[] = [];

  produits$ = combineLatest([this.service.produits$, this.search$, this.category$, this.status$, this.page$]).pipe(
    map(([items, term, category, status, page]) => {
      this.categories = [...new Set(items.map(item => item.categorie))].sort();
      const needle = term.trim().toLowerCase();
      const filtered = items.filter(i => (!needle || [i.nom, i.reference, i.referenceEquipementier, i.codeBarres, ...i.referencesOem].some(v => v.toLowerCase().includes(needle))) && (!category || i.categorie === category) && (!status || this.stockStatus(i) === status));
      return filtered.slice(page * this.pageSize, (page + 1) * this.pageSize);
    })
  );
  total$ = combineLatest([this.service.produits$, this.search$, this.category$, this.status$]).pipe(map(([items, term, category, status]) => { const needle=term.toLowerCase(); return items.filter(i => (!needle || [i.nom,i.reference,i.referenceEquipementier,i.codeBarres,...i.referencesOem].some(v=>v.toLowerCase().includes(needle))) && (!category || i.categorie===category) && (!status || this.stockStatus(i)===status)).length; }));

  onSearch(value: string): void { this.search$.next(value); this.page$.next(0); }
  pageChange(index: number): void { this.page$.next(index); }
  filterCategory(value: string): void { this.category$.next(value); this.page$.next(0); }
  filterStatus(value: string): void { this.status$.next(value); this.page$.next(0); }
  stockStatus(product: Produit): string { const available=product.stock-product.stockReserve; return available<=0?'RUPTURE':available<=product.seuilAlerte?'STOCK_FAIBLE':'EN_STOCK'; }
  statusLabel(product: Produit): string { return this.stockStatus(product)==='RUPTURE'?'Rupture':this.stockStatus(product)==='STOCK_FAIBLE'?'Stock faible':'En stock'; }

  openDialog(produit?: Produit): void {
    this.dialog.open(ProduitDialogComponent, { data: produit ?? null, width: '860px', maxWidth: '96vw' }).afterClosed().subscribe((result?: Produit) => { if (result) this.service.upsert(result); });
  }
  delete(id: number): void { if (confirm('Désactiver cette pièce du catalogue ?')) this.service.remove(id); }
}
