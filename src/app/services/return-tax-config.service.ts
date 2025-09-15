import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { ReturnFeeConfig, Company } from '../interface/return-tax-config.interface';


@Injectable({
  providedIn: 'root'
})
export class ReturnFeeConfigService {
  private returnFeeConfigSignal = signal<ReturnFeeConfig | null>(null);

  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  private mockReturnFeeConfig: ReturnFeeConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    return: [
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
    this.returnFeeConfigSignal.set(this.mockReturnFeeConfig);
  }

  get returnFeeConfig() {
    return this.returnFeeConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getReturnFeeConfig(): Observable<ReturnFeeConfig | null> {
    return of(this.returnFeeConfigSignal()).pipe(delay(300));
  }

  saveReturnFeeConfig(config: ReturnFeeConfig): Observable<ReturnFeeConfig> {
    return of(config).pipe(
      delay(500),
      map(savedConfig => {
        this.returnFeeConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}