import { Component } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  cards = [
    { label: 'Ventes du jour', value: '12 500 MAD' },
    { label: 'Total crédit', value: '8 900 MAD' },
    { label: 'Produits rupture', value: '7' },
    { label: 'Solde caisse', value: '4 300 MAD' }
  ];
}
