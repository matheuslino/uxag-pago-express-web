import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionConfigService } from '../../../services/transaction-config.service';
import { Company, TransactionConfig } from '../../../interface/transaction-config.interface';

@Component({
  selector: 'app-transaction-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './transaction-config-modal.html',
  styleUrl: './transaction-config-modal.scss',
})
export class TransactionConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private transactionConfigService = inject(TransactionConfigService);
  private dialogRef = inject(MatDialogRef<TransactionConfigModalComponent>);

  // Signals para estado reativo
  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  transactionConfigForm: FormGroup;

  constructor() {
    this.transactionConfigForm = this.fb.group({
      deposits: [false],
      withdrawals: [false],
      depositCommission: [false],
      transfer: [false],
      boleto: [false],
      thirdPartyWithdrawals: [false],
      division: [false],
      checkValidation: [false],
      billPayment: [false],
      walletTransfer: [false],
      creditCard: [false]
    });
  }

  ngOnInit() {
    this.loadTransactionConfig();
    this.loadCompanyInfo();
  }

  private loadTransactionConfig() {
    this.transactionConfigService.getTransactionConfig().subscribe(config => {
      if (config) {
        this.transactionConfigForm.patchValue({
          deposits: config.deposits,
          withdrawals: config.withdrawals,
          depositCommission: config.depositCommission,
          transfer: config.transfer,
          boleto: config.boleto,
          thirdPartyWithdrawals: config.thirdPartyWithdrawals,
          division: config.division,
          checkValidation: config.checkValidation,
          billPayment: config.billPayment,
          walletTransfer: config.walletTransfer,
          creditCard: config.creditCard
        });
      }
    });
  }

  private loadCompanyInfo() {
    this.transactionConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onSave() {
    this.isLoading.set(true);

    const formValue = this.transactionConfigForm.value;
    const company = this.selectedCompany();

    const transactionConfig: TransactionConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      ...formValue
    };

    this.transactionConfigService.saveTransactionConfig(transactionConfig).subscribe({
      next: (savedConfig) => {
        this.isLoading.set(false);
        this.dialogRef.close(savedConfig);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Erro ao salvar configuração:', error);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}