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
import { WalletTransferConfig, WalletTransferConfigModalComponent1 } from '../../shared/components/wallet-transfer-config-modal-1/wallet-transfer-config-modal';
import { WalletTransferConfigModalComponent } from '../../shared/components/wallet-transfer-config-modal-2/wallet-transfer-config-modal';
import { IntegrationConfigModalComponent } from '../../shared/components/integration-config-modal/integration-config-modal.component';

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
      width: '800px',
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
      width: '800px',
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

  openWalletTransferConfigModal1() {
    const dialogRef = this.dialog.open(WalletTransferConfigModalComponent1, {
      width: '800px',
      maxWidth: '95vw',
      disableClose: false,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: WalletTransferConfig) => {
      if (result) {
        console.log('Configuração salva:', result);
      }
    });
  }

  openWalletTransferConfigModal2() {
    const dialogRef = this.dialog.open(WalletTransferConfigModalComponent, {
      minWidth: '800px',
      maxHeight: '90vh',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Configuração salva:', result);
      }
    });
  }

  openIntegrationConfigModal() {
    const dialogRef = this.dialog.open(IntegrationConfigModalComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'custom-modal-panel'
    });


    return dialogRef.afterClosed();

  }

}