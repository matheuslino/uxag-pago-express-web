// src/app/components/bank-config-modal/bank-config-modal.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BankConfigService } from '../../../services/bank-config.service';
import { BankConfig, Company } from '../../../interface/bank-config.interface';

@Component({
  selector: 'app-bank-config-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './bank-config-modal.html',
  styleUrl: './bank-config-modal.scss',
})
export class BankConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bankConfigService = inject(BankConfigService);
  private dialogRef = inject(MatDialogRef<BankConfigModalComponent>);

  // Signals para estado reativo
  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  bankConfigForm: FormGroup;

  constructor() {
    this.bankConfigForm = this.fb.group({
      pixIn: ['', Validators.required],
      pixOut: ['', Validators.required],
      sendPix: ['', Validators.required],
      creditCard: ['', Validators.required],
      boleto: ['', Validators.required],
      billPayment: ['']
    });
  }

  ngOnInit() {
    this.loadBankConfig();
    this.loadCompanyInfo();
  }

  private loadBankConfig() {
    this.bankConfigService.getBankConfig().subscribe(config => {
      if (config) {
        this.bankConfigForm.patchValue({
          pixIn: config.pixIn,
          pixOut: config.pixOut,
          sendPix: config.sendPix,
          creditCard: config.creditCard,
          boleto: config.boleto,
          billPayment: config.billPayment
        });
      }
    });
  }

  private loadCompanyInfo() {
    this.bankConfigService.getCompanies().subscribe(companies => {
      // Simula empresa selecionada (primeira da lista)
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onSave() {
    if (this.bankConfigForm.valid) {
      this.isLoading.set(true);

      const formValue = this.bankConfigForm.value;
      const company = this.selectedCompany();

      const bankConfig: BankConfig = {
        id: '1', // Em produção, viria do backend
        companyName: company?.name || '',
        companyCode: company?.code || '',
        ...formValue
      };

      this.bankConfigService.saveBankConfig(bankConfig).subscribe({
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
  }
}