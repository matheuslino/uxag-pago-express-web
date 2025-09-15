import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LimitPaymentFeeConfigService } from '../../../services/split-tax-config.service copy';
import { Company, LimitPaymentFeeConfig } from '../../../interface/limit-payment-tax-config.interface';

interface LimitPaymentFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

@Component({
  selector: 'app-limitPayment-fee-config-modal',
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
  templateUrl: './limit-payment-tax-config-modal.html',
  styleUrl: './limit-payment-tax-config-modal.scss',
})
export class LimitPaymentFeeConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private limitPaymentFeeConfigService = inject(LimitPaymentFeeConfigService);
  private dialogRef = inject(MatDialogRef<LimitPaymentFeeConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  limitPaymentFeeForm: FormGroup;
  limitPaymentList: LimitPaymentFee[] = [];

  constructor() {
    this.limitPaymentFeeForm = this.fb.group({
      minValue: [0.01, [Validators.required, Validators.min(0.01)]],
      maxValue: [0.01, [Validators.required, Validators.min(0.01)]],
      feePercentage: [0, [Validators.required, Validators.min(0)]],
      minFee: [0, [Validators.required, Validators.min(0)]],
      maxFee: [0, [Validators.required, Validators.min(0)]],
      fixedFee: [0.01, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadLimitPaymentFeeConfig();
    this.loadCompanyInfo();
  }

  private loadLimitPaymentFeeConfig() {
    this.limitPaymentFeeConfigService.getLimitPaymentFeeConfig().subscribe(config => {
      if (config) {
        this.limitPaymentList = config.limitPayment;
      }
    });
  }

  private loadCompanyInfo() {
    this.limitPaymentFeeConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onAddRule() {
    if (this.limitPaymentFeeForm.valid) {
      this.limitPaymentList.push({ ...this.limitPaymentFeeForm.value });
      this.limitPaymentFeeForm.reset({
        minValue: 0.01,
        maxValue: 0.01,
        feePercentage: 0,
        minFee: 0,
        maxFee: 0,
        fixedFee: 0.01
      });
    }
  }

  onSave() {
    if (this.limitPaymentList.length === 0) return;

    this.isLoading.set(true);
    const company = this.selectedCompany();

    const limitPaymentFeeConfig: LimitPaymentFeeConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      limitPayment: this.limitPaymentList
    };

    this.limitPaymentFeeConfigService.saveLimitPaymentFeeConfig(limitPaymentFeeConfig).subscribe({
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