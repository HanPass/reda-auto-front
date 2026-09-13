import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'produits',
    canActivate: [AuthGuard],
    loadChildren: () => import('./produits/produits.module').then((m) => m.ProduitsModule)
  },
  {
    path: 'fournisseurs',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./fournisseurs/fournisseurs.module').then((m) => m.FournisseursModule)
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule)
  },
  {
    path: 'ventes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./ventes/ventes.module').then((m) => m.VentesModule)
  },
  { path: 'stock', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'MAGASINIER'] }, loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) },
  { path: 'achats', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'MAGASINIER'] }, loadChildren: () => import('./achats/achats.module').then(m => m.AchatsModule) },
  { path: 'rapports', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'GERANT'] }, loadChildren: () => import('./rapports/rapports.module').then(m => m.RapportsModule) },
  { path: 'parametres', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] }, loadChildren: () => import('./parametres/parametres.module').then(m => m.ParametresModule) },
  {
    path: 'credit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./credit/credit.module').then((m) => m.CreditModule)
  },
  {
    path: 'caisse',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'CAISSIER'] },
    loadChildren: () => import('./caisse/caisse.module').then((m) => m.CaisseModule)
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
