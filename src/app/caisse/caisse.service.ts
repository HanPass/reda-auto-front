import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CaisseService {
  private ouvertSubject = new BehaviorSubject<boolean>(false);
  private soldeSubject = new BehaviorSubject<number>(0);

  ouvert$ = this.ouvertSubject.asObservable();
  solde$ = this.soldeSubject.asObservable();

  ouvrir(soldeInitial: number): void {
    this.ouvertSubject.next(true);
    this.soldeSubject.next(soldeInitial);
  }

  depense(montant: number): void {
    this.soldeSubject.next(this.soldeSubject.value - montant);
  }

  fermer(soldeCompte: number): number {
    const ecart = soldeCompte - this.soldeSubject.value;
    this.ouvertSubject.next(false);
    return ecart;
  }
}
