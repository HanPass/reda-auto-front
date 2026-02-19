import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CaisseService } from './caisse.service';

@Component({ templateUrl: './caisse.component.html' })
export class CaisseComponent {
  private fb = inject(FormBuilder);
  private service = inject(CaisseService);

  openForm = this.fb.group({ initial: [0, Validators.required] });
  depenseForm = this.fb.group({ montant: [0, Validators.required] });
  closeForm = this.fb.group({ compte: [0, Validators.required] });
  ecart: number | null = null;
  ouvert$ = this.service.ouvert$;
  solde$ = this.service.solde$;

  ouvrir(): void { this.service.ouvrir(this.openForm.getRawValue().initial || 0); }
  depense(): void { this.service.depense(this.depenseForm.getRawValue().montant || 0); }
  fermer(): void { this.ecart = this.service.fermer(this.closeForm.getRawValue().compte || 0); }
}
