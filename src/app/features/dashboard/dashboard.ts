import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { BankConfigService } from '../../services/bank-config.service';
import { TransactionConfigService } from '../../services/transaction-config.service';
import { BankConfigModalComponent } from '../../shared/components/bank-config-modal/bank-config-modal';
import { TransactionConfigModalComponent } from '../../shared/components/transaction-config-modal/transaction-config-modal';
import { TransferConfigModalComponent } from '../../shared/components/transfer-config-modal/transfer-config-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  private dialog = inject(MatDialog);
  private bankConfigService = inject(BankConfigService);
  private transactionConfigService = inject(TransactionConfigService);

  // Signals reativos
  bankConfig = this.bankConfigService.bankConfig;
  transactionConfig = this.transactionConfigService.transactionConfig;

  openBankConfigModal() {
    const dialogRef = this.dialog.open(BankConfigModalComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Configuração bancária salva:', result);
      }
    });
  }

  openTransactionConfigModal() {
    const dialogRef = this.dialog.open(TransactionConfigModalComponent, {
      width: '800px',
      maxWidth: '95vw',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Configuração de transações salva:', result);
      }
    });
  }

  openTransferConfigModal() {
  const dialogRef = this.dialog.open(TransferConfigModalComponent, {
    width: '650px',
    maxWidth: '95vw',
    disableClose: false,
    autoFocus: true,
    panelClass: 'transfer-modal-panel'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Configuração de transferência salva:', result);
      // aqui você pode chamar o TransferConfigService.saveTransferConfig(result)
    }
  });
}
}