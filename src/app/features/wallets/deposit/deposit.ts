import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-deposit',
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
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss'
})
export class Deposit {
  
  public isModalVisible = false;

  public depositData = {
    valor: null as number | null
  };

  public paymentInfo = {
    identificador: 'PixPay LTDA',
    cnpj: '44.190.808/0001-54',
    dataCriacao: '19/03/2025',
    dataExpiracao: '19/03/2025',
    valor: 0,
    pixCopyPaste: '00020126800014br.gov.bcb.pix013696c4a062-e16b-447c-9421-5...'
  };

  public headerInformation = {
    pageTitle: 'Depósito em carteira',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/carteira' },
      { label: 'Visualização', path: '/carteira/deposit' }
    ],
    saldo: 1000,
  }

  public sendLabel: string = 'Enviar';
  public footerInformation: string = '001';
  public footerContext: string = 'Depósito';
  public footerLabel: string = '';

  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  openConfirmationModal(): void {
    if (this.depositData.valor && this.depositData.valor > 0) {
      this.paymentInfo.valor = this.depositData.valor;
      this.isModalVisible = true;
    } else {
      alert('Por favor, insira um valor para o depósito.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  proceedWithPayment(): void {
    this.closeConfirmationModal();
    this.depositData.valor = null;
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.openConfirmationModal();
  }

}