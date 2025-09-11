import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { Company, TransferConfig } from '../interface/transfer-config.interface';

@Injectable({
  providedIn: 'root'
})
export class TransferConfigService {
  private transferConfigSignal = signal<TransferConfig | null>(null);

  private mockCompanies: Company[] = [
    { id: '1', nome: 'Empresa', milhas: '123 Milhas', icon: 'business' },
    { id: '2', nome: 'TAM Linhas Aéreas', milhas: '250 Milhas', icon: 'flight' },
    { id: '3', nome: 'Gol Linhas Aéreas', milhas: '180 Milhas', icon: 'flight' },
    { id: '4', nome: 'Azul Linhas Aéreas', milhas: '320 Milhas', icon: 'flight' }
  ];

  private mockTransferConfig: TransferConfig = {
    id: '1',
    empresa: { nome: 'Empresa', milhas: '123 Milhas' },
    gratis: null,
    limite: null,
    fixo: null,
    taxa: null,
    minimo: null,
    maximo: null
  };

  constructor() {
    this.transferConfigSignal.set(this.mockTransferConfig);
  }

  get transferConfig() {
    return this.transferConfigSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getTransferConfig(): Observable<TransferConfig | null> {
    return of(this.transferConfigSignal()).pipe(delay(300));
  }

  saveTransferConfig(config: TransferConfig): Observable<TransferConfig> {
    return of(config).pipe(
      delay(500),
      tap((savedConfig: TransferConfig) => {
        this.transferConfigSignal.set(savedConfig);
      })
    );
  }
}
