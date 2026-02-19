import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ClientsService } from '../clients/clients.service';
import { CreditService } from './credit.service';

@Component({ templateUrl: './credit.component.html' })
export class CreditComponent {
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  private creditService = inject(CreditService);

  form = this.fb.group({ client: ['', Validators.required], montant: [0, Validators.required] });
  debiteurs$ = this.clientsService.clients$.pipe(map((c) => c.filter((x) => x.creditActuel > 0)));
  historique$ = this.creditService.remboursements$;

  rembourser(): void {
    const { client, montant } = this.form.getRawValue();
    if (!client || !montant) return;
    this.creditService.ajouter(client, montant);
    this.form.reset({ client: '', montant: 0 });
  }
}
