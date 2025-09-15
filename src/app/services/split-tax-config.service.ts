import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { SplitFeeConfig, Company } from '../interface/split-tax-config.interface';


@Injectable({
  providedIn: 'root'
})
export class SplitFeeConfigService {
  private splitFeeConfigSignal = signal<SplitFeeConfig | null>(null);

  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  private mockSplitFeeConfig: SplitFeeConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    split: [
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
    this.splitFeeConfigSignal.set(this.mockSplitFeeConfig);
  }

  get splitFeeConfig() {
    return this.splitFeeConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getSplitFeeConfig(): Observable<SplitFeeConfig | null> {
    return of(this.splitFeeConfigSignal()).pipe(delay(300));
  }

  saveSplitFeeConfig(config: SplitFeeConfig): Observable<SplitFeeConfig> {
    return of(config).pipe(
      delay(500),
      map(savedConfig => {
        this.splitFeeConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}