import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUser, UserRole } from '../core/models/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string): Observable<AppUser> {
    const role: UserRole = username === 'admin' ? 'ADMIN' : username === 'caisse' ? 'CAISSIER' : 'VENDEUR';
    const user: AppUser = { username, role, token: btoa(`${username}:${password}`) };
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    return of(user);
  }
}
