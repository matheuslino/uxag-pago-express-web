import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';
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
    FooterInfo,
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
    saldo: 1000,
  }

  public sendLabel: string = 'Enviar';
  public footerInformation: string = '001';
  public footerContext: string = 'Transferencia';
  public footerLabel: string = '';

  public menuAbertoIndex: number | null = null;

  constructor(private router: Router,
    private location: Location) { }

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
      dataHora: `R$ ${this.transferData.valor.toFixed(2).replace('.', ',')}`, // Formatação simples da data/hora
      status: 'Pendente'
    };

    this.pendingWithdrawals.push(newWithdrawal);
    this.hasPendingWithdrawals = true;

    this.transferData.chavePix = '';
    this.transferData.valor = null;
    this.closeConfirmationModal();
  }
}