import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WithdrawalFeeConfigService } from '../../../services/withdrawal-fee-config.service';
import { WithdrawalFeeConfig, Company } from '../../../interface/withdrawal-fee-config.interface';

interface PixInFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

@Component({
  selector: 'app-withdrawal-fee-config-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './withdrawal-fee-config-modal.component.html',
  styleUrl: './withdrawal-fee-config-modal.component.scss',
})
export class WithdrawalFeeConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private withdrawalFeeConfigService = inject(WithdrawalFeeConfigService);
  private dialogRef = inject(MatDialogRef<WithdrawalFeeConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  withdrawalFeeForm: FormGroup;
  pixInList: PixInFee[] = []; // lista de regras acumuladas

  constructor() {
    this.withdrawalFeeForm = this.fb.group({
      minValue: [0.01, [Validators.required, Validators.min(0.01)]],
      maxValue: [0.01, [Validators.required, Validators.min(0.01)]],
      feePercentage: [0, [Validators.required, Validators.min(0)]],
      minFee: [0, [Validators.required, Validators.min(0)]],
      maxFee: [0, [Validators.required, Validators.min(0)]],
      fixedFee: [0.01, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadWithdrawalFeeConfig();
    this.loadCompanyInfo();
  }

  private loadWithdrawalFeeConfig() {
    this.withdrawalFeeConfigService.getWithdrawalFeeConfig().subscribe(config => {
      if (config) {
        this.pixInList = config.pixIn; // agora carrega como lista
      }
    });
  }

  private loadCompanyInfo() {
    this.withdrawalFeeConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  /** Adiciona regra na lista */
  onAddRule() {
    if (this.withdrawalFeeForm.valid) {
      this.pixInList.push({ ...this.withdrawalFeeForm.value });
      this.withdrawalFeeForm.reset({
        minValue: 0.01,
        maxValue: 0.01,
        feePercentage: 0,
        minFee: 0,
        maxFee: 0,
        fixedFee: 0.01
      });
    }
  }

  /** Salva todas as regras */
  onSave() {
    if (this.pixInList.length === 0) return; // impede salvar vazio

    this.isLoading.set(true);
    const company = this.selectedCompany();

    const withdrawalFeeConfig: WithdrawalFeeConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      pixIn: this.pixInList
    };

    this.withdrawalFeeConfigService.saveWithdrawalFeeConfig(withdrawalFeeConfig).subscribe({
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

  onClose() {
    this.dialogRef.close();
  }
}
