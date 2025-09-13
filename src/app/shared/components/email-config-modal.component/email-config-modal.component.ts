import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmailConfigService } from '../../../services/email-config.service';
import { EmailConfig, Company } from '../../../interface/email-config.interface';

@Component({
  selector: 'app-email-config-modal',
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
  templateUrl: './email-config-modal.component.html',
  styleUrl: './email-config-modal.component.scss',
})
export class EmailConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private emailConfigService = inject(EmailConfigService);
  private dialogRef = inject(MatDialogRef<EmailConfigModalComponent>);

  // Signals para estado reativo
  selectedCompany = signal<Company | null>(null);
  isLoading = signal(false);

  emailConfigForm: FormGroup;

  constructor() {
    this.emailConfigForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadEmailConfig();
    this.loadCompanyInfo();
  }

  private loadEmailConfig() {
    this.emailConfigService.getEmailConfig().subscribe(config => {
      if (config) {
        this.emailConfigForm.patchValue({
          email: config.email
        });
      }
    });
  }

  private loadCompanyInfo() {
    this.emailConfigService.getCompanies().subscribe(companies => {
      // Simula empresa selecionada (primeira da lista)
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
      }
    });
  }

  onSave() {
    if (this.emailConfigForm.valid) {
      this.isLoading.set(true);

      const formValue = this.emailConfigForm.value;
      const company = this.selectedCompany();

      const emailConfig: EmailConfig = {
        id: '1', // Em produção, viria do backend
        companyName: company?.name || '',
        companyCode: company?.code || '',
        ...formValue
      };

      this.emailConfigService.saveEmailConfig(emailConfig).subscribe({
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