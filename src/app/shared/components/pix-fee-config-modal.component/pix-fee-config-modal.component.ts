import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PixFeeConfigService } from '../../../services/pix-fee-config.service';
import { PixFeeConfig, Company } from '../../../interface/pix-fee-config.interface';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './pix-fee-config-modal.component.html',
  styleUrls: ['./pix-fee-config-modal.component.scss'],
})
export class PixFeeConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pixFeeConfigService = inject(PixFeeConfigService);
  private dialogRef = inject(MatDialogRef<PixFeeConfigModalComponent>);

  pixFeeConfigForm: FormGroup;
  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  // Lista que vai alimentar a tabela
  savedConfigs: PixFeeConfig[] = [];

  constructor() {
    this.pixFeeConfigForm = this.fb.group({
      valorMenor: [0.01, [Validators.required, Validators.min(0)]],
      valorMaior: [0, [Validators.required, Validators.min(0)]],
      taxa: [0, [Validators.required, Validators.min(0)]],
      minimo: [0, [Validators.required, Validators.min(0)]],
      maximo: [0, [Validators.required, Validators.min(0)]],
      fixo: [0.01, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadPixFeeConfig();
    this.loadCompanyInfo();
  }

  private loadPixFeeConfig() {
    this.pixFeeConfigService.getPixFeeConfig().subscribe(config => {
      if (config) {
        this.savedConfigs = [config]; // já carrega a tabela
        this.pixFeeConfigForm.patchValue(config);
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

  onSaveToTable() {
    if (this.pixFeeConfigForm.valid) {
      const formValue = this.pixFeeConfigForm.value;
      const company = this.selectedCompany();

      const newConfig: PixFeeConfig = {
        id: crypto.randomUUID(),
        companyName: company?.name || '',
        companyCode: company?.code || '',
        ...formValue
      };

      this.savedConfigs.push(newConfig);
      this.pixFeeConfigForm.reset({
        valorMenor: 0.01,
        valorMaior: 0,
        taxa: 0,
        minimo: 0,
        maximo: 0,
        fixo: 0.01
      });
    }
  }

  onConclude() {
    if (this.savedConfigs.length > 0) {
      this.isLoading.set(true);
      this.pixFeeConfigService.savePixFeeConfig(this.savedConfigs[0]).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.dialogRef.close(this.savedConfigs);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
