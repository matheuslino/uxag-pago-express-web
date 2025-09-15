import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { BoletoFeeConfig, Company } from '../interface/boleto-tax-config.interface';


@Injectable({
  providedIn: 'root'
})
export class BoletoFeeConfigService {
  private boletoFeeConfigSignal = signal<BoletoFeeConfig | null>(null);

  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  private mockBoletoFeeConfig: BoletoFeeConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    boleto: [
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
    this.boletoFeeConfigSignal.set(this.mockBoletoFeeConfig);
  }

  get boletoFeeConfig() {
    return this.boletoFeeConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getBoletoFeeConfig(): Observable<BoletoFeeConfig | null> {
    return of(this.boletoFeeConfigSignal()).pipe(delay(300));
  }

  saveBoletoFeeConfig(config: BoletoFeeConfig): Observable<BoletoFeeConfig> {
    return of(config).pipe(
      delay(500),
      map(savedConfig => {
        this.boletoFeeConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}