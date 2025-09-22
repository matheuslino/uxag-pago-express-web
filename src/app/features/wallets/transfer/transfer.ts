import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FooterInfoTransferencia } from '../../../shared/components/footer-info-transferencia/footer-info-transferencia';

export interface IPendingWithdrawal {
  solicitante: {
    name: string;
    email: string;
  };
  carteira: {
    id: number;
    name: string;
  };
  chavePix: string;
  valor: number;
  dataHora: string;
  status: 'Pendente';
}

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
    FooterInfoTransferencia,
  ],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer {

  public hasPendingWithdrawals = false;
  public pendingWithdrawals: IPendingWithdrawal[] = [];
  public isModalVisible = false;

  public transferData = {
    chavePix: '',
    valor: null as number | null
  };

  public headerInformation = {
    pageTitle: 'Transferência',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/list' }
    ],
    values: {
      value: 'R$ 189,000',
      percentage: '7%',
      filterDays: 7,
    },
    actionButton: {
      actionLabel: 'movimentar',
      disabled: false,
      onClick: () => {}
    },
    actionButton2: {
      actionLabel: 'exportar',
      disabled: false,
      onClick: () => {}
    }
  }

  public sendLabel: string = 'Enviar';
  public menuAbertoIndex: number | null = null;

  // Propriedades para o Footer
  public get footerInformation(): string {
    return '001';
  }

  public get footerContext(): string {
    return 'Transferencia';
  }

  public get footerLabel(): string {
    return '';
  }

  public get saldoValor(): string {
    return `R$ ${this.headerInformation.values.value}`;
  }

  public get tipoChaveValor(): string {
    if (!this.transferData.chavePix) return '';
    
    // Detecta o tipo de chave PIX baseado no formato
    const chave = this.transferData.chavePix.replace(/\D/g, '');
    
    if (chave.length === 11) return 'CPF';
    if (chave.length === 14) return 'CNPJ';
    if (this.transferData.chavePix.includes('@')) return 'E-mail';
    if (this.transferData.chavePix.match(/^\+?[1-9]\d{1,14}$/)) return 'Telefone';
    
    return 'Chave aleatória';
  }

  public get chavePixValor(): string {
    return this.transferData.chavePix || '';
  }

  public get valorTransacao(): string {
    if (!this.transferData.valor) return '';
    return `R$ ${this.transferData.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }

  constructor(private router: Router, private location: Location) { }

  openConfirmationModal(): void {
    if (this.transferData.chavePix && this.transferData.valor) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha a Chave PIX e o Valor.');
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.openConfirmationModal();
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  confirmTransfer(): void {
    if (!this.transferData.valor) return;

    const newWithdrawal: IPendingWithdrawal = {
      solicitante: {
        name: 'Lucas Admin',
        email: 'lucas.admin@example.com'
      },
      carteira: {
        id: 531,
        name: 'Wallet 2'
      },
      chavePix: this.transferData.chavePix,
      valor: this.transferData.valor,
      dataHora: new Date().toLocaleString('pt-BR'),
      status: 'Pendente'
    };

    this.pendingWithdrawals.push(newWithdrawal);
    this.hasPendingWithdrawals = true;

    this.transferData.chavePix = '';
    this.transferData.valor = null;
    this.closeConfirmationModal();
  }
}