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
import { PixLimitsModalComponent } from '../../shared/components/pix-limits-modal/pix-limits-modal.component';
import { IpConfigModalComponent } from '../../shared/components/ip-permission-modal/ip-permission-modal.component';
import { LimitConfigModalComponent } from '../../shared/components/limit-config-modal.component/limit-config-modal.component';
import { PaymentLimitModalComponent } from '../../shared/components/payment-limit-modal/payment-limit-modal.component';
import { EmailConfigModalComponent } from '../../shared/components/email-config-modal.component/email-config-modal.component';
import { CertificateModalComponent } from '../../shared/components/certificate-modal.component/certificate-modal.component';
import { PixFeeConfigModalComponent } from '../../shared/components/pix-fee-config-modal.component/pix-fee-config-modal.component';
import { WithdrawalFeeConfigModalComponent } from '../../shared/components/withdrawal-fee-config-modal/withdrawal-fee-config-modal.component';
import { CreditCardFeesModalComponent } from '../../shared/components/credit-card-fees-modal.component/credit-card-fees-modal.component';
import { BoletoFeeConfigModalComponent } from '../../shared/components/boleto-tax-config-modal/boleto-tax-config-modal.component';
import { SplitFeeConfigModalComponent } from '../../shared/components/split-tax-config-modal/sprit-tax-config-modal.component';
import { ReturnFeeConfigModalComponent } from '../../shared/components/return-tax-config-modal/return-tax-config-modal';
import { PixWalletConfigModalComponent } from '../../shared/components/pix-tax-config-modal/pix-tax-config-modal';

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
  openPixLimitModal() {
    const dialogRef = this.dialog.open(PixLimitsModalComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'custom-modal-panel'
    });


    return dialogRef.afterClosed();

  }
  openConfigIpsModal() {
    const dialogRef = this.dialog.open(IpConfigModalComponent, {
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

  openLimitConfigModal() {
    const dialogRef = this.dialog.open(LimitConfigModalComponent, {
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

  openLimitSaqConfigModal() {
    const dialogRef = this.dialog.open(PaymentLimitModalComponent, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Configuração de transações salva:', result);
      }
    });
  }

  openEmailConfigModal() {
    const dialogRef = this.dialog.open(EmailConfigModalComponent, {
      width: '800px',
      maxWidth: '90vh',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Configuração de transações salva:', result);
      }
    });
  }

  certificateModal() {
    const dialogRef = this.dialog.open(CertificateModalComponent, {
      width: '800px',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }

  openTaxasPixModal() {
    const dialogRef = this.dialog.open(PixFeeConfigModalComponent, {
      width: '800px',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }

  openTaxaSaqueModal() {
    const dialogRef = this.dialog.open(WithdrawalFeeConfigModalComponent, {
      width: '800px',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }

  openTaxCredit() {
    const dialogRef = this.dialog.open(CreditCardFeesModalComponent, {
      width: '1000px',
      maxWidth: '1000px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }

  openBoletoTaxConfigModal() {
    const dialogRef = this.dialog.open(BoletoFeeConfigModalComponent, {
      width: '1000px',
      maxWidth: '1000px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }


  openSplitTaxConfigModal() {
    const dialogRef = this.dialog.open(SplitFeeConfigModalComponent, {
      width: '1000px',
      maxWidth: '1000px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }

  openBoletoReturnConfigModal() {
    const dialogRef = this.dialog.open(ReturnFeeConfigModalComponent, {
      width: '1000px',
      maxWidth: '1000px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }

  openPixTaxConfigModal(){
     const dialogRef = this.dialog.open( PixWalletConfigModalComponent, {
      width: '800px',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificados configurados:', result);
      }
    });
  }
}