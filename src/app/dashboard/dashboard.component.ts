import { Component, inject } from '@angular/core';
import { CountryService } from '../core/services/country.service';
import { DemoStoreService } from '../core/services/demo-store.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private store = inject(DemoStoreService);
  country = inject(CountryService);
  products = this.store.products;
  sales = this.store.sales;
  movements = this.store.movements.slice(0, 7);
  revenue = this.sales.reduce((sum, sale) => sum + sale.total, 0);
  margin = this.sales.reduce((sum, sale) => sum + sale.items.reduce((value, line) => value + ((line.prixUnitaire - (this.store.getProduct(line.produitId)?.prixAchat || 0)) * line.qte), 0), 0);
  stockValue = this.products.reduce((sum, product) => sum + product.prixAchat * product.stock, 0);
  lowStock = this.products.filter(product => product.stock > 0 && product.stock - product.stockReserve <= product.seuilAlerte);
  outOfStock = this.products.filter(product => product.stock === 0);
  topProducts = [...this.products].sort((a, b) => b.stock * b.prix - a.stock * a.prix).slice(0, 5);
  bars = [62, 78, 55, 92, 73, 88, 96];
  days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
}
