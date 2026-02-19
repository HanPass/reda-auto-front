import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menu = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/produits', label: 'Produits' },
    { path: '/clients', label: 'Clients' },
    { path: '/ventes', label: 'Ventes' },
    { path: '/credit', label: 'Crédit' },
    { path: '/caisse', label: 'Caisse' },
    { path: '/fournisseurs', label: 'Fournisseurs' }
  ];

  constructor(private router: Router) {}

  get isAuthRoute(): boolean {
    return this.router.url.startsWith('/auth');
  }

  toggleTheme(enabled: boolean): void {
    document.body.classList.toggle('dark-theme', enabled);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
