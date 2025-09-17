import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { CommonModule } from '@angular/common';
import { CustomCheckbox } from '../../../shared/components/custom-checkbox/custom-checkbox';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';
import { CustomSelect } from '../../../shared/components/custom-select/custom-select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface BankConfig {
  pixIn: string;
  pixOut: string;
  boleto: string;
  enviarPix: string;
}

interface ClientRecord {
  id: string;
  solicitante: string;
  username: string;
  carteira: string;
  walletNumber: string;
  chavePix: string;
  valor: number;
  selected: boolean;
}

interface BankOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-batch-bank',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomCheckbox,
    CustomSelect,
    FooterInfo,
  ],
  templateUrl: './batch-bank.html',
  styleUrl: './batch-bank.scss'
})
export class BatchBank {
  
  bankForm!: FormGroup;

  public headerInformation = {
    pageTitle: 'Banco em lote',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Alterar banco em lote', path: '/administracao/batch-bank' }
    ],
  };

  public bankOptions: BankOption[] = [
    { value: 'ASAAS', label: 'ASAAS' },
    { value: 'BRADESCO', label: 'Bradesco' },
    { value: 'BANCO_DO_BRASIL', label: 'Banco do Brasil' },
    { value: 'ITAU', label: 'Itaú' },
    { value: 'SANTANDER', label: 'Santander' },
    { value: 'CAIXA', label: 'Caixa Econômica' },
    { value: 'NUBANK', label: 'Nubank' }
  ];

  public pixInControl = new FormControl('ASAAS');
  public pixOutControl = new FormControl('ASAAS');
  public boletoControl = new FormControl('ASAAS');
  public enviarPixControl = new FormControl('ASAAS');

  public clientRecords: ClientRecord[] = [
    {
      id: '1',
      solicitante: 'Pago Express',
      username: 'lucas_adm',
      carteira: '531',
      walletNumber: 'Wallet 2',
      chavePix: 'cliente@pix.bcb.gov.br',
      valor: 239.12,
      selected: true
    },
    {
      id: '2',
      solicitante: 'Pago Express',
      username: 'lucas_adm',
      carteira: '531',
      walletNumber: 'Wallet 2',
      chavePix: 'cliente@pix.bcb.gov.br',
      valor: 3810.12,
      selected: true
    },
    {
      id: '3',
      solicitante: 'Tech Solutions',
      username: 'maria_admin',
      carteira: '742',
      walletNumber: 'Wallet 1',
      chavePix: 'pagamentos@techsol.com.br',
      valor: 1250.50,
      selected: false
    },
    {
      id: '4',
      solicitante: 'Digital Corp',
      username: 'joao_fin',
      carteira: '863',
      walletNumber: 'Wallet 3',
      chavePix: '11987654321',
      valor: 598.75,
      selected: false
    },
    {
      id: '5',
      solicitante: 'StartUp Hub',
      username: 'ana_cfo',
      carteira: '294',
      walletNumber: 'Wallet 1',
      chavePix: 'financeiro@startuphub.io',
      valor: 2100.00,
      selected: true
    }
  ];

  public isHeaderCheckboxChecked: boolean = false;
  
  public footerInformation: string = '001';
  public footerContext: string = 'Configuração de Banco';
  public footerLabel: string = 'Alterar banco em lote';

  constructor(private fb: FormBuilder) {
    this.initializeForm();
    this.updateHeaderCheckbox();
  }

  private initializeForm() {
    this.bankForm = this.fb.group({
      pixIn: ['ASAAS'],
      pixOut: ['ASAAS'],
      boleto: ['ASAAS'],
      enviarPix: ['ASAAS']
    });
  }

  onHeaderCheckboxChange(checked: boolean): void {
    this.isHeaderCheckboxChecked = checked;
    this.clientRecords.forEach(record => {
      record.selected = checked;
    });
  }

  onRecordCheckboxChange(recordId: string, checked: boolean): void {
    const record = this.clientRecords.find(r => r.id === recordId);
    if (record) {
      record.selected = checked;
      this.updateHeaderCheckbox();
    }
  }

  private updateHeaderCheckbox(): void {
    const selectedCount = this.getSelectedRecords().length;
    const totalCount = this.clientRecords.length;
    
    this.isHeaderCheckboxChecked = selectedCount > 0 && selectedCount === totalCount;
  }

  getSelectedRecords(): ClientRecord[] {
    return this.clientRecords.filter(record => record.selected);
  }

  getTotalRecords(): number {
    return this.clientRecords.length;
  }

  getSelectedCount(): number {
    return this.getSelectedRecords().length;
  }

  getCurrentBankConfig(): any {
    const selectedRecords = this.getSelectedRecords();
    if (selectedRecords.length === 0) return null;
    return {
      depositoPix: this.getBankLabel(this.pixInControl.value ?? 'ASAAS'),
      boleto: this.getBankLabel(this.boletoControl.value ?? 'ASAAS'),
      saquesPix: this.getBankLabel(this.pixOutControl.value ?? 'ASAAS'),
      enviarPix: this.getBankLabel(this.enviarPixControl.value ?? 'ASAAS')
    };
  }

  private getBankLabel(bankValue: string): string {
    const bank = this.bankOptions.find(b => b.value === bankValue);
    return bank ? bank.label : bankValue;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  onCancel(): void {
    this.pixInControl.setValue('ASAAS');
    this.boletoControl.setValue('ASAAS');
    this.pixOutControl.setValue('ASAAS');
    this.enviarPixControl.setValue('ASAAS');
    this.clientRecords.forEach(record => {
      record.selected = false;
    });
    this.isHeaderCheckboxChecked = false;
    alert('Configurações canceladas e resetadas!');
  }

  onSubmit(): void {
    const selectedRecords = this.getSelectedRecords();
    if (selectedRecords.length === 0) {
      alert('Por favor, selecione pelo menos um registro para alterar.');
      return;
    }
    const configData = {
      bankConfig: this.getCurrentBankConfig(),
      selectedRecords: selectedRecords.map(r => ({
        id: r.id,
        solicitante: r.solicitante,
        carteira: r.carteira
      })),
    };
    alert(JSON.stringify(configData));
  }

  trackByRecordId(index: number, record: ClientRecord): string {
    return record.id;
  }

  trackByBankValue(index: number, bank: BankOption): string {
    return bank.value;
  }
}