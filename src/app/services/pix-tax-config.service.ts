import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { PixFeeConfig, Company } from '../interface/pix-tax-config.interface';


@Injectable({
  providedIn: 'root'
})
export class PixFeeConfigService {
  private pixFeeConfigSignal = signal<PixFeeConfig | null>(null);

  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  private mockPixFeeConfig: PixFeeConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    pix: [
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
    this.pixFeeConfigSignal.set(this.mockPixFeeConfig);
  }

  get pixFeeConfig() {
    return this.pixFeeConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getPixFeeConfig(): Observable<PixFeeConfig | null> {
    return of(this.pixFeeConfigSignal()).pipe(delay(300));
  }

  savePixFeeConfig(config: PixFeeConfig): Observable<PixFeeConfig> {
    return of(config).pipe(
      delay(500),
      map(savedConfig => {
        this.pixFeeConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}