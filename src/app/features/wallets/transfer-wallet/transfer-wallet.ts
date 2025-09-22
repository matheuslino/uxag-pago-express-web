import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { FooterInfoTransferencia } from '../../../shared/components/footer-info-transferencia/footer-info-transferencia';

@Component({
  selector: 'app-transfer-wallet',
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
  templateUrl: './transfer-wallet.html',
  styleUrl: './transfer-wallet.scss'
})
export class TransferWallet {

  public isModalVisible = false;

  public headerInformation = {
    pageTitle: 'Transferência entre contas',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/carteira' },
      { label: 'Visualização', path: '/carteira/transfer-wallet' }
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
  public footerInformation: string = '001';
  public footerContext: string = 'Transferencia entre contas';
  public footerLabel: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  public transferData = {
    favorecido: '',
    carteiraFavorecido: '',
    chavePix: '',
    valor: null as number | null
  };

  // Getters para o Footer Avançado
  public get saldoValor(): string {
    return `R$ ${this.headerInformation.values.value}`;
  }

  public get tipoChaveValor(): string {
    if (!this.transferData.chavePix) return '';
    
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

  openConfirmationModal(): void {
    if (this.transferData.favorecido && this.transferData.carteiraFavorecido && this.transferData.valor) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha todos os dados do favorecido e o valor.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  confirmTransfer(): void {
    console.log('Transferência confirmada:', this.transferData);

    this.transferData = {
      favorecido: '',
      carteiraFavorecido: '',
      chavePix: '',
      valor: null
    };
    this.closeConfirmationModal();
    alert('Transferência enviada para autorização!');
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.openConfirmationModal();
  }
}