import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ClientsService } from '../clients/clients.service';
import { CreditService } from './credit.service';
import { DemoStoreService } from '../core/services/demo-store.service';
import { CountryService } from '../core/services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ templateUrl: './credit.component.html' })
export class CreditComponent {
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  private creditService = inject(CreditService);
  private store = inject(DemoStoreService);
  private snack = inject(MatSnackBar);
  country = inject(CountryService);

  form = this.fb.group({ clientId: [null as number|null, Validators.required], montant: [0, [Validators.required,Validators.min(1)]] });
  debiteurs$ = this.clientsService.clients$.pipe(map((c) => c.filter((x) => x.creditActuel > 0)));
  historique$ = this.creditService.remboursements$;

  rembourser(): void {
    const { clientId, montant } = this.form.getRawValue();
    if (!clientId || !montant) return;
    const client=this.store.clients.find(c=>c.id===clientId);if(!client)return;
    this.store.repayClientCredit(clientId,montant);this.creditService.ajouter(client.nom, montant);
    this.form.reset({ clientId: null, montant: 0 });this.snack.open('Règlement client enregistré','Fermer',{duration:3000});
  }
}
