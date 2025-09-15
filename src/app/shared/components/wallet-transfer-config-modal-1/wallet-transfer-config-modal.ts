import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// Interface para tipagem dos dados
export interface WalletTransferConfig {
  empresa: {
    nome: string;
    valor: string;
  };
  gratis: number;
  fixo: number;
  taxa: number;
  minimo: number;
  maximo: number;
  horarioInicial: string;
  horarioFinal: string;
  quantidadeLimiteDiario: number | null;
  valorLimiteDiario: number | null;
  valorLimiteMensal: number | null;
  porcentagemLimiteCarteira: number | null;
}

@Component({
  selector: 'app-wallet-transfer-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './wallet-transfer-config-modal.html',
  styleUrls: ['./wallet-transfer-config-modal.scss']
})
export class WalletTransferConfigModalComponent1 {
  @Input() config?: WalletTransferConfig;
  @Output() configSaved = new EventEmitter<WalletTransferConfig>();
  @Output() configCanceled = new EventEmitter<void>();

  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WalletTransferConfigModalComponent1>
  ) {
    this.configForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.config) {
      this.configForm.patchValue(this.config);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      empresa: this.fb.group({
        nome: ['Empresa', Validators.required],
        valor: ['123 Milhas', Validators.required]
      }),
      gratis: [0, [Validators.required, Validators.min(0)]],
      fixo: [0, [Validators.required, Validators.min(0)]],
      taxa: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      minimo: [0, [Validators.required, Validators.min(0)]],
      maximo: [0, [Validators.required, Validators.min(0)]],
      horarioInicial: ['--:--', Validators.required],
      horarioFinal: ['--:--', Validators.required],
      quantidadeLimiteDiario: [null],
      valorLimiteDiario: [null],
      valorLimiteMensal: [null],
      porcentagemLimiteCarteira: [null]
    });
  }

  onSave(): void {
    if (this.configForm.valid) {
      const formValue = this.configForm.value;
      this.configSaved.emit(formValue);
      this.dialogRef.close(formValue);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.configCanceled.emit();
    this.dialogRef.close();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.configForm.controls).forEach(key => {
      const control = this.configForm.get(key);
      control?.markAsTouched();
    });
  }

  // Método para formatar valores monetários
  formatCurrency(event: any): void {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = (parseFloat(value) / 100).toFixed(2);
    event.target.value = formattedValue;
  }

  // Método para formatar horário
  formatTime(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + ':' + value.substring(2, 4);
    }
    event.target.value = value;
  }
}