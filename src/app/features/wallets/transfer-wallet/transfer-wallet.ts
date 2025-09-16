import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

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
    FooterInfo,
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
    saldo: 1000,
  }

  public sendLabel: string = 'Enviar';
  public footerInformation: string = '001';
  public footerContext: string = 'Transferencia entre contas';
  public footerLabel: string = '';

  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  public transferData = {
    favorecido: '',
    carteiraFavorecido: '',
    chavePix: '',
    valor: null as number | null
  };

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