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
import { WalletTransferConfigService } from '../../../services/wallet-transfer-config.service';
import { Company, WalletTransferConfig } from '../../../interface/wallet-transfer-config.interface';

@Component({
  selector: 'app-wallet-transfer-config-modal',
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
  templateUrl: './wallet-transfer-config-modal.html',
  styleUrl: './wallet-transfer-config-modal.scss',
})
export class WalletTransferConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private walletTransferConfigService = inject(WalletTransferConfigService);
  private dialogRef = inject(MatDialogRef<WalletTransferConfigModalComponent>);

  // Signals
  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  walletTransferConfigForm: FormGroup;

  constructor() {
    this.walletTransferConfigForm = this.fb.group({
      deposits: [false],
      depositsHour: [0],
      withdrawals: [false],
      withdrawalsHour: [0],
      wallets: [false],
      walletsValue: [0]
    });
  }

  ngOnInit() {
    this.loadWalletTransferConfig();
    this.loadCompanyInfo();
  }

  private loadWalletTransferConfig() {
    this.walletTransferConfigService.getWalletTransferConfig().subscribe(config => {
      if (config) {
        this.walletTransferConfigForm.patchValue({
          deposits: config.deposits,
          depositsHour: config.depositsHour,
          withdrawals: config.withdrawals,
          withdrawalsHour: config.withdrawalsHour,
          wallets: config.wallets,
          walletsValue: config.walletsValue
        });
      }
    });
  }

  private loadCompanyInfo() {
    this.walletTransferConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onSave() {
    this.isLoading.set(true);

    const formValue = this.walletTransferConfigForm.value;
    const company = this.selectedCompany();

    const walletTransferConfig: WalletTransferConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      ...formValue
    };

    this.walletTransferConfigService.saveWalletTransferConfig(walletTransferConfig).subscribe({
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
