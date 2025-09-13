import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface PaymentLimit {
  criadoEm: string;
  criadoPor: string;
  evento: string;
  limiteDiario: number;
  limiteMensal: number;
  percentual: number;
  qtdLimiteDiario: number;
}

@Component({
  selector: 'app-payment-limit-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  templateUrl: './payment-limit-modal.component.html',
  styleUrls: ['./payment-limit-modal.component.scss']
})
export class PaymentLimitModalComponent {
  private dialogRef = inject(MatDialogRef<PaymentLimitModalComponent>);
  private fb = inject(FormBuilder);

  // formulário
  form: FormGroup = this.fb.group({
    horarioInicio: [''],
    horarioFinal: [''],
    qtdLimiteDiario: [''],
    valorLimiteDiario: [''],
    valorLimiteMensal: [''],
    percentualCarteira: ['']
  });

  // lista reativa de limites
  paymentLimits = signal<PaymentLimit[]>([]);

  displayedColumns: string[] = [
    'criadoEm',
    'criadoPor',
    'evento',
    'limiteDiario',
    'limiteMensal',
    'percentual',
    'qtdLimiteDiario'
  ];

  incluir() {
    const novo: PaymentLimit = {
      criadoEm: new Date().toLocaleString(),
      criadoPor: 'lucas_adm',
      evento: 'Cadastrado',
      limiteDiario: this.form.value.valorLimiteDiario || 0,
      limiteMensal: this.form.value.valorLimiteMensal || 0,
      percentual: this.form.value.percentualCarteira || 0,
      qtdLimiteDiario: this.form.value.qtdLimiteDiario || 0
    };

    this.paymentLimits.update(l => [...l, novo]);
    this.form.reset();
  }

  fechar() {
    this.dialogRef.close(this.paymentLimits());
  }
}
