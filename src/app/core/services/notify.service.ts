import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 2500, panelClass: ['snack-ok'] });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3500, panelClass: ['snack-error'] });
  }
}
