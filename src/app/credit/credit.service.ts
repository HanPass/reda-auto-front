import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreditService {
  private remboursementsSubject = new BehaviorSubject<{ client: string; montant: number; date: string }[]>([]);
  remboursements$ = this.remboursementsSubject.asObservable();

  ajouter(client: string, montant: number): void {
    this.remboursementsSubject.next([
      { client, montant, date: new Date().toISOString() },
      ...this.remboursementsSubject.value
    ]);
  }
}
