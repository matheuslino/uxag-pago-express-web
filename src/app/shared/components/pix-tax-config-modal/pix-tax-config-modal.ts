import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PixFeeConfigService } from '../../../services/pix-tax-config.service';
import { PixFeeConfig, Company } from '../../../interface/pix-tax-config.interface';

interface PixFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

@Component({
  selector: 'app-pix-fee-config-modal',
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
  templateUrl: './pix-tax-config-modal.html',
  styleUrl: './pix-tax-config-modal.scss',
})
export class PixWalletConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pixFeeConfigService = inject(PixFeeConfigService);
  private dialogRef = inject(MatDialogRef<PixWalletConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  pixFeeForm: FormGroup;
  pixList: PixFee[] = [];

  constructor() {
    this.pixFeeForm = this.fb.group({
      minValue: [0.01, [Validators.required, Validators.min(0.01)]],
      maxValue: [0.01, [Validators.required, Validators.min(0.01)]],
      feePercentage: [0, [Validators.required, Validators.min(0)]],
      minFee: [0, [Validators.required, Validators.min(0)]],
      maxFee: [0, [Validators.required, Validators.min(0)]],
      fixedFee: [0.01, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadPixFeeConfig();
    this.loadCompanyInfo();
  }

  private loadPixFeeConfig() {
    this.pixFeeConfigService.getPixFeeConfig().subscribe(config => {
      if (config) {
        this.pixList = config.pix;
      }
    });
  }

  private loadCompanyInfo() {
    this.pixFeeConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onAddRule() {
    if (this.pixFeeForm.valid) {
      this.pixList.push({ ...this.pixFeeForm.value });
      this.pixFeeForm.reset({
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
    if (this.pixList.length === 0) return;

    this.isLoading.set(true);
    const company = this.selectedCompany();

    const pixFeeConfig: PixFeeConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      pix: this.pixList
    };

    this.pixFeeConfigService.savePixFeeConfig(pixFeeConfig).subscribe({
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