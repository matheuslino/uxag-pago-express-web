import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { LimitPaymentFeeConfig, Company } from '../interface/limit-payment-tax-config.interface';


@Injectable({
  providedIn: 'root'
})
export class LimitPaymentFeeConfigService {
  private limitPaymentFeeConfigSignal = signal<LimitPaymentFeeConfig | null>(null);

  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  private mockLimitPaymentFeeConfig: LimitPaymentFeeConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    limitPayment: [
      {
        minValue: 0.01,
        maxValue: 0.01,
        feePercentage: 0,
        minFee: 0,
        maxFee: 0,
        fixedFee: 0.01
      }
    ]
  };

  constructor() {
    this.limitPaymentFeeConfigSignal.set(this.mockLimitPaymentFeeConfig);
  }

  get limitPaymentFeeConfig() {
    return this.limitPaymentFeeConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getLimitPaymentFeeConfig(): Observable<LimitPaymentFeeConfig | null> {
    return of(this.limitPaymentFeeConfigSignal()).pipe(delay(300));
  }

  saveLimitPaymentFeeConfig(config: LimitPaymentFeeConfig): Observable<LimitPaymentFeeConfig> {
    return of(config).pipe(
      delay(500),
      map(savedConfig => {
        this.limitPaymentFeeConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}