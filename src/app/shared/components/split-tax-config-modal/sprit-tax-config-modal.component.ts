import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SplitFeeConfigService } from '../../../services/split-tax-config.service';
import { SplitFeeConfig, Company } from '../../../interface/split-tax-config.interface';

interface SplitFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

@Component({
  selector: 'app-split-fee-config-modal',
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
  templateUrl: './split-tax-config-modal.html',
  styleUrl: './split-tax-config-modal.scss',
})
export class SplitFeeConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private splitFeeConfigService = inject(SplitFeeConfigService);
  private dialogRef = inject(MatDialogRef<SplitFeeConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  splitFeeForm: FormGroup;
  splitList: SplitFee[] = [];

  constructor() {
    this.splitFeeForm = this.fb.group({
      minValue: [0.01, [Validators.required, Validators.min(0.01)]],
      maxValue: [0.01, [Validators.required, Validators.min(0.01)]],
      feePercentage: [0, [Validators.required, Validators.min(0)]],
      minFee: [0, [Validators.required, Validators.min(0)]],
      maxFee: [0, [Validators.required, Validators.min(0)]],
      fixedFee: [0.01, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadSplitFeeConfig();
    this.loadCompanyInfo();
  }

  private loadSplitFeeConfig() {
    this.splitFeeConfigService.getSplitFeeConfig().subscribe(config => {
      if (config) {
        this.splitList = config.split;
      }
    });
  }

  private loadCompanyInfo() {
    this.splitFeeConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onAddRule() {
    if (this.splitFeeForm.valid) {
      this.splitList.push({ ...this.splitFeeForm.value });
      this.splitFeeForm.reset({
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
    if (this.splitList.length === 0) return;

    this.isLoading.set(true);
    const company = this.selectedCompany();

    const splitFeeConfig: SplitFeeConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      split: this.splitList
    };

    this.splitFeeConfigService.saveSplitFeeConfig(splitFeeConfig).subscribe({
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