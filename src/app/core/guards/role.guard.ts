import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserRole } from '../models/types';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = (route.data['roles'] ?? []) as UserRole[];
    const currentRole = localStorage.getItem('role') as UserRole | null;
    const allowed = !!currentRole && expectedRoles.includes(currentRole);

    if (!allowed) {
      this.router.navigate(['/dashboard']);
    }
    return allowed;
  }
}
