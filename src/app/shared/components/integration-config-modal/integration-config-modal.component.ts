import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { IntegrationConfigService } from '../../../services/integration-config.service';
import { Company, IntegrationConfig } from '../../../interface/integration-config.interface';

@Component({
  selector: 'app-integration-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './integration-config-modal.component.html',
  styleUrl: './integration-config-modal.component.scss',
})
export class IntegrationConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<IntegrationConfigModalComponent>);
  private integrationService = inject(IntegrationConfigService);

  // Signals
  selectedCompany = signal<Company>({ id: '1', name: 'Empresa', document: '123 Milhas' });
  showPassword = signal(false);
  isLoading = signal(false);

  integrationForm: FormGroup;

  constructor() {
    this.integrationForm = this.fb.group({
      login: ['0120062839', [Validators.required]],
      password: ['qwertyasf128130', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadCompanyData();
    this.loadIntegrationConfig();
  }

  private loadCompanyData(): void {
    // Simula carregamento dos dados da empresa
    this.integrationService.getSelectedCompany().subscribe(company => {
      this.selectedCompany.set(company);
    });
  }

  private loadIntegrationConfig(): void {
    // Simula carregamento da configuração existente
    this.integrationService.getIntegrationConfig('entrepay').subscribe(config => {
      if (config) {
        this.integrationForm.patchValue({
          login: config.login,
          password: config.password
        });
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSave(): void {
    if (this.integrationForm.valid) {
      this.isLoading.set(true);
      
      const formValue = this.integrationForm.value;
      const config: IntegrationConfig = {
        id: 'entrepay',
        name: 'Entrepay',
        description: 'Integração com sistema Entrepay',
        login: formValue.login,
        password: formValue.password,
        isActive: true
      };

      this.integrationService.saveIntegrationConfig(config).subscribe({
        next: (result) => {
          this.isLoading.set(false);
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Erro ao salvar configuração:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}