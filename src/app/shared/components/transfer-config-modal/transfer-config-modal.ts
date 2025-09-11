import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TransferConfigService } from '../../../services/transfer-config.service';
import { Company, TransferConfig } from '../../../interface/transfer-config.interface';


@Component({
  selector: 'app-transfer-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './transfer-config-modal.html',
  styleUrl: './transfer-config-modal.scss',
})
export class TransferConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private transferConfigService = inject(TransferConfigService);
  private dialogRef = inject(MatDialogRef<TransferConfigModalComponent>);

  // Signals para reatividade
  companies = signal<Company[]>([]);
  isLoading = signal(false);

  transferForm: FormGroup;

  constructor() {
    this.transferForm = this.fb.group({
      empresaId: ['', Validators.required],
      gratis: [null],
      limite: [null],
      fixo: [null],
      taxa: [null],
      minimo: [null],
      maximo: [null]
    });
  }

  ngOnInit() {
    this.loadCompanies();
    this.loadCurrentConfig();
  }

  private loadCompanies() {
    this.transferConfigService.getCompanies().subscribe(companies => {
      this.companies.set(companies);
    });
  }

  private loadCurrentConfig() {
    this.transferConfigService.getTransferConfig().subscribe(config => {
      if (config) {
        // Encontrar a empresa pelo nome
        const company = this.companies().find(c => c.nome === config.empresa.nome);
        
        this.transferForm.patchValue({
          empresaId: company?.id || '',
          gratis: config.gratis,
          limite: config.limite,
          fixo: config.fixo,
          taxa: config.taxa,
          minimo: config.minimo,
          maximo: config.maximo
        });
      }
    });
  }

  onSave() {
    if (this.transferForm.valid) {
      this.isLoading.set(true);
      
      const formValue = this.transferForm.value;
      const selectedCompany = this.companies().find(c => c.id === formValue.empresaId);
      
      const transferConfig: TransferConfig = {
        id: '1', // Em produção, viria do backend
        empresa: {
          nome: selectedCompany?.nome || '',
          milhas: selectedCompany?.milhas || ''
        },
        gratis: formValue.gratis,
        limite: formValue.limite,
        fixo: formValue.fixo,
        taxa: formValue.taxa,
        minimo: formValue.minimo,
        maximo: formValue.maximo
      };

      this.transferConfigService.saveTransferConfig(transferConfig).subscribe({
        next: (savedConfig) => {
          this.isLoading.set(false);
          this.dialogRef.close(savedConfig);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Erro ao salvar configuração:', error);
          // Aqui você pode adicionar tratamento de erro (toast, snackbar, etc.)
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}