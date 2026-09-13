import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from '../core/models/types';
import { CountryService } from '../core/services/country.service';
import { ProduitsService } from './produits.service';

@Component({ templateUrl: './produit-detail.component.html', styleUrl: './produit-detail.component.scss' })
export class ProduitDetailComponent {
  private route = inject(ActivatedRoute); private products = inject(ProduitsService); country = inject(CountryService);
  product?: Produit = this.products.getById(Number(this.route.snapshot.paramMap.get('id')));
  get available(): number { return this.product ? this.product.stock - this.product.stockReserve : 0; }
  get margin(): number { return this.product ? this.product.prix - this.product.prixAchat : 0; }
}
