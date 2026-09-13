import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUser, UserRole } from '../core/models/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string): Observable<AppUser> {
    const roles: Record<string, UserRole> = { admin: 'ADMIN', caisse: 'CAISSIER', magasinier: 'MAGASINIER', gerant: 'GERANT' };
    const role: UserRole = roles[username.toLowerCase()] || 'VENDEUR';
    const user: AppUser = { username, role, token: btoa(`${username}:${password}`) };
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', username);
    return of(user);
  }
}
