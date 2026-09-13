import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CountryCode, UserRole } from './core/models/types';
import { CountryService } from './core/services/country.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrl: './app.component.scss' })
export class AppComponent {
  private countryService = inject(CountryService);
  mobile = window.innerWidth < 900;
  menuOpened = !this.mobile;
  country$ = this.countryService.country$;
  get username(): string { return localStorage.getItem('username') || 'Utilisateur'; }
  menu: Array<{path:string;label:string;icon:string;roles?:UserRole[]}> = [
    { path: '/dashboard', label: 'Tableau de bord', icon: 'dashboard' },
    { path: '/ventes/comptoir', label: 'Vente comptoir', icon: 'point_of_sale' },
    { path: '/produits', label: 'Pièces', icon: 'settings' },
    { path: '/stock', label: 'Stock', icon: 'inventory_2', roles: ['ADMIN','MAGASINIER'] },
    { path: '/achats', label: 'Achats', icon: 'local_shipping', roles: ['ADMIN','MAGASINIER'] },
    { path: '/ventes', label: 'Ventes', icon: 'receipt_long' },
    { path: '/clients', label: 'Clients', icon: 'groups' },
    { path: '/fournisseurs', label: 'Fournisseurs', icon: 'factory', roles: ['ADMIN'] },
    { path: '/credit', label: 'Crédits', icon: 'account_balance_wallet' },
    { path: '/caisse', label: 'Caisse', icon: 'payments', roles: ['ADMIN','CAISSIER'] },
    { path: '/rapports', label: 'Rapports', icon: 'query_stats', roles: ['ADMIN','GERANT'] },
    { path: '/parametres', label: 'Paramètres', icon: 'tune', roles: ['ADMIN'] }
  ];
  get visibleMenu(): typeof this.menu { const role=localStorage.getItem('role') as UserRole|null; return this.menu.filter(item=>!item.roles||!!role&&item.roles.includes(role)); }
  constructor(private router: Router) {}
  get isAuthRoute(): boolean { return this.router.url.startsWith('/auth'); }
  @HostListener('window:resize') onResize(): void { this.mobile = window.innerWidth < 900; this.menuOpened = !this.mobile; }
  selectCountry(code: CountryCode): void { this.countryService.setCountry(code); }
  closeOnMobile(): void { if (this.mobile) this.menuOpened = false; }
  toggleTheme(enabled: boolean): void { document.body.classList.toggle('dark-theme', enabled); }
  logout(): void { ['token', 'role', 'username'].forEach(key => localStorage.removeItem(key)); this.router.navigate(['/auth/login']); }
}
