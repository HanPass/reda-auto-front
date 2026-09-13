import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountryCode, CountryConfig } from '../models/types';

export const COUNTRY_CONFIGS: Record<CountryCode, CountryConfig> = {
  MA: { code: 'MA', label: 'Maroc', currency: 'MAD', locale: 'fr-MA', taxRate: .2, taxLabel: 'TVA démo', addressHint: 'Adresse, ville, code postal', paymentModes: ['ESPECES', 'CARTE', 'VIREMENT', 'MIXTE', 'CREDIT'] },
  FR: { code: 'FR', label: 'France', currency: 'EUR', locale: 'fr-FR', taxRate: .2, taxLabel: 'TVA démo', addressHint: 'N°, rue, code postal, ville', paymentModes: ['ESPECES', 'CARTE', 'VIREMENT', 'MIXTE', 'CREDIT'] }
};

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly key = 'reda-auto-country';
  private countrySubject = new BehaviorSubject<CountryCode>((localStorage.getItem(this.key) as CountryCode) || 'MA');
  country$ = this.countrySubject.asObservable();
  config$ = new BehaviorSubject<CountryConfig>(COUNTRY_CONFIGS[this.countrySubject.value]);
  get config(): CountryConfig { return COUNTRY_CONFIGS[this.countrySubject.value]; }
  setCountry(code: CountryCode): void { localStorage.setItem(this.key, code); this.countrySubject.next(code); this.config$.next(COUNTRY_CONFIGS[code]); }
  formatPrice(value: number): string { return new Intl.NumberFormat(this.config.locale, { style: 'currency', currency: this.config.currency, maximumFractionDigits: 2 }).format(value); }
}
