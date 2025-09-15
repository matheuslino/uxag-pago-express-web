import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReturnFeeConfigService } from '../../../services/return-tax-config.service';
import { ReturnFeeConfig, Company } from '../../../interface/return-tax-config.interface';

interface ReturnFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

@Component({
  selector: 'app-return-fee-config-modal',
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
  templateUrl: './return-tax-config-modal.html',
  styleUrl: './return-tax-config-modal.scss',
})
export class ReturnFeeConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private returnFeeConfigService = inject(ReturnFeeConfigService);
  private dialogRef = inject(MatDialogRef<ReturnFeeConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  returnFeeForm: FormGroup;
  returnList: ReturnFee[] = [];

  constructor() {
    this.returnFeeForm = this.fb.group({
      minValue: [0.01, [Validators.required, Validators.min(0.01)]],
      maxValue: [0.01, [Validators.required, Validators.min(0.01)]],
      feePercentage: [0, [Validators.required, Validators.min(0)]],
      minFee: [0, [Validators.required, Validators.min(0)]],
      maxFee: [0, [Validators.required, Validators.min(0)]],
      fixedFee: [0.01, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadReturnFeeConfig();
    this.loadCompanyInfo();
  }

  private loadReturnFeeConfig() {
    this.returnFeeConfigService.getReturnFeeConfig().subscribe(config => {
      if (config) {
        this.returnList = config.return;
      }
    });
  }

  private loadCompanyInfo() {
    this.returnFeeConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onAddRule() {
    if (this.returnFeeForm.valid) {
      this.returnList.push({ ...this.returnFeeForm.value });
      this.returnFeeForm.reset({
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
    if (this.returnList.length === 0) return;

    this.isLoading.set(true);
    const company = this.selectedCompany();

    const returnFeeConfig: ReturnFeeConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      return: this.returnList
    };

    this.returnFeeConfigService.saveReturnFeeConfig(returnFeeConfig).subscribe({
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