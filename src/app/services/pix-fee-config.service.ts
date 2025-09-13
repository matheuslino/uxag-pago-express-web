import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { PixFeeConfig, Company } from '../interface/pix-fee-config.interface';

@Injectable({
  providedIn: 'root'
})
export class PixFeeConfigService {
  private pixFeeConfigSignal = signal<PixFeeConfig | null>(null);

  // Mock data para empresas
  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' }
  ];

  // Mock data para configuração inicial
  private mockPixFeeConfig: PixFeeConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    valorMenor: 0.01,
    valorMaior: 0,
    taxa: 0,
    minimo: 0,
    maximo: 0,
    fixo: 0.01
  };

  constructor() {
    this.pixFeeConfigSignal.set(this.mockPixFeeConfig);
  }

  get pixFeeConfig() {
    return this.pixFeeConfigSignal.asReadonly();
  }

  getPixFeeConfig(): Observable<PixFeeConfig | null> {
    return of(this.pixFeeConfigSignal()).pipe(delay(300));
  }

  savePixFeeConfig(config: PixFeeConfig): Observable<PixFeeConfig> {
    return of(config).pipe(
      delay(500),
      tap(savedConfig => {
        this.pixFeeConfigSignal.set(savedConfig);
      })
    );
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }
}