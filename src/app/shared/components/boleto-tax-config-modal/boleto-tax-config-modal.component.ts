import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BoletoFeeConfigService } from '../../../services/boleto-tax-config.service';
import { BoletoFeeConfig, Company } from '../../../interface/boleto-tax-config.interface';

interface BoletoFee {
  minValue: number;
  maxValue: number;
  feePercentage: number;
  minFee: number;
  maxFee: number;
  fixedFee: number;
}

@Component({
  selector: 'app-boleto-fee-config-modal',
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
  templateUrl: './boleto-tax-config-modal.html',
  styleUrl: './boleto-tax-config-modal.scss',
})
export class BoletoFeeConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private boletoFeeConfigService = inject(BoletoFeeConfigService);
  private dialogRef = inject(MatDialogRef<BoletoFeeConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  boletoFeeForm: FormGroup;
  boletoList: BoletoFee[] = [];

  constructor() {
    this.boletoFeeForm = this.fb.group({
      minValue: [0.01, [Validators.required, Validators.min(0.01)]],
      maxValue: [0.01, [Validators.required, Validators.min(0.01)]],
      feePercentage: [0, [Validators.required, Validators.min(0)]],
      minFee: [0, [Validators.required, Validators.min(0)]],
      maxFee: [0, [Validators.required, Validators.min(0)]],
      fixedFee: [0.01, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadBoletoFeeConfig();
    this.loadCompanyInfo();
  }

  private loadBoletoFeeConfig() {
    this.boletoFeeConfigService.getBoletoFeeConfig().subscribe(config => {
      if (config) {
        this.boletoList = config.boleto;
      }
    });
  }

  private loadCompanyInfo() {
    this.boletoFeeConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onAddRule() {
    if (this.boletoFeeForm.valid) {
      this.boletoList.push({ ...this.boletoFeeForm.value });
      this.boletoFeeForm.reset({
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
    if (this.boletoList.length === 0) return;

    this.isLoading.set(true);
    const company = this.selectedCompany();

    const boletoFeeConfig: BoletoFeeConfig = {
      id: '1',
      companyName: company?.name || '',
      companyCode: company?.code || '',
      boleto: this.boletoList
    };

    this.boletoFeeConfigService.saveBoletoFeeConfig(boletoFeeConfig).subscribe({
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