// src/app/services/transaction-config.service.ts
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Company, TransactionConfig } from '../interface/transaction-config.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionConfigService {
  // Signal reativo para configuração atual
  transactionConfig = signal<TransactionConfig | null>(null);

  // Dados mockados
  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123M' },
    { id: '2', name: 'Wansoft Brazil', code: 'WSB' }
  ];

  private mockTransactionConfig: TransactionConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123M',
    deposits: true,
    withdrawals: true,
    depositCommission: false,
    transfer: false,
    boleto: true,
    thirdPartyWithdrawals: true,
    division: true,
    checkValidation: false,
    billPayment: true,
    walletTransfer: false,
    creditCard: true
  };

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(500));
  }

  getTransactionConfig(): Observable<TransactionConfig> {
    return of(this.mockTransactionConfig).pipe(delay(500));
  }

  saveTransactionConfig(config: TransactionConfig): Observable<TransactionConfig> {
    // Simula salvamento no backend
    const savedConfig = { ...config, id: Date.now().toString() };
    this.transactionConfig.set(savedConfig);
    
    return of(savedConfig).pipe(delay(1000));
  }
}