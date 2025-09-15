import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Company, WalletTransferConfig } from '../interface/wallet-transfer-config.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletTransferConfigService {
  private mockCompanies: Company[] = [
    {
      id: '1',
      name: '123 Milhas',
      code: '123M'
    }
  ];

  private mockConfig: WalletTransferConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123M',
    deposits: true,
    depositsHour: 8,
    withdrawals: false,
    withdrawalsHour: 0,
    wallets: true,
    walletsValue: 1000
  };

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getWalletTransferConfig(): Observable<WalletTransferConfig> {
    return of(this.mockConfig).pipe(delay(500));
  }

  saveWalletTransferConfig(config: WalletTransferConfig): Observable<WalletTransferConfig> {
    // Simula salvamento no backend
    this.mockConfig = { ...config };
    return of(this.mockConfig).pipe(delay(1000));
  }
}