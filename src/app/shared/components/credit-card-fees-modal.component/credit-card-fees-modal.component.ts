import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Interface para configuração de taxa
export interface CreditCardFeeConfig {
  id?: string;
  fornecedor: string;
  bandeira: string;
  tipo: string;
  minParcela: number;
  maxParcela: number;
  taxa: number;
}

// Interface para dados da empresa
export interface CompanyInfo {
  nome: string;
  milhas: string;
}

@Component({
  selector: 'app-credit-card-fees-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './credit-card-fees-modal.component.html',
  styleUrls: ['./credit-card-fees-modal.component.scss']
})
export class CreditCardFeesModalComponent implements OnInit {
  @Input() companyInfo: CompanyInfo = { nome: 'Empresa', milhas: '123 Milhas' };
  @Output() onSave = new EventEmitter<CreditCardFeeConfig[]>();
  @Output() onCancel = new EventEmitter<void>();

  feesForm!: FormGroup;

  // Dados mockados para os selects
  fornecedores = [
    { value: 'entrepay', label: 'Entrepay' },
    { value: 'stone', label: 'Stone' },
    { value: 'pagseguro', label: 'PagSeguro' },
    { value: 'mercadopago', label: 'Mercado Pago' }
  ];

  bandeiras = [
    { value: 'visa', label: 'VISA' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'elo', label: 'Elo' },
    { value: 'amex', label: 'American Express' }
  ];

  tipos = [
    { value: 'avista', label: 'À VISTA' },
    { value: 'parcelado', label: 'Parcelado' },
    { value: 'credito', label: 'Crédito' },
    { value: 'debito', label: 'Débito' }
  ];

  parcelasOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString()
  }));

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreditCardFeesModalComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.feesForm = this.fb.group({
      fees: this.fb.array([
        this.createFeeFormGroup(),
        this.createFeeFormGroup()
      ])
    });
  }

  private createFeeFormGroup(): FormGroup {
    return this.fb.group({
      fornecedor: ['entrepay', Validators.required],
      bandeira: ['visa', Validators.required],
      tipo: ['avista', Validators.required],
      minParcela: [0, [Validators.required, Validators.min(0)]],
      maxParcela: [2, [Validators.required, Validators.min(1)]],
      taxa: [0.01, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get feesArray(): FormArray {
    return this.feesForm.get('fees') as FormArray;
  }

  addNewFee(): void {
    this.feesArray.push(this.createFeeFormGroup());
  }

  removeFee(index: number): void {
    if (this.feesArray.length > 1) {
      this.feesArray.removeAt(index);
    }
  }

  onSaveClick(): void {
    if (this.feesForm.valid) {
      const fees: CreditCardFeeConfig[] = this.feesArray.value.map((fee: any, index: number) => ({
        id: `fee_${Date.now()}_${index}`,
        ...fee
      }));
      this.onSave.emit(fees);
      this.dialogRef.close(fees);
    }
  }

  onCancelClick(): void {
    this.onCancel.emit();
    this.dialogRef.close();
  }

  formatTaxaDisplay(taxa: number): string {
    return `${(taxa * 100).toFixed(2)}%`;
  }
}