import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { WithdrawalFeeConfig, Company } from '../interface/withdrawal-fee-config.interface';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalFeeConfigService {
  private withdrawalFeeConfigSignal = signal<WithdrawalFeeConfig | null>(null);

  // Mock data para empresas
  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  // Mock data para configuração inicial
 private mockWithdrawalFeeConfig: WithdrawalFeeConfig = {
  id: '1',
  companyName: '123 Milhas',
  companyCode: '123MILHAS',
  pixIn: [
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
    this.withdrawalFeeConfigSignal.set(this.mockWithdrawalFeeConfig);
  }

  get withdrawalFeeConfig() {
    return this.withdrawalFeeConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getWithdrawalFeeConfig(): Observable<WithdrawalFeeConfig | null> {
    return of(this.withdrawalFeeConfigSignal()).pipe(delay(300));
  }

  saveWithdrawalFeeConfig(config: WithdrawalFeeConfig): Observable<WithdrawalFeeConfig> {
    return of(config).pipe(
      delay(500),
      map(savedConfig => {
        this.withdrawalFeeConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}