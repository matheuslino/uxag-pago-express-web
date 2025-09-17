import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-send-pix',
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
  templateUrl: './send-pix.html',
  styleUrl: './send-pix.scss'
})
export class SendPix {

  public showAccountData = false;

  public isModalVisible = false;

  public transferData = {
    chavePix: '',
    valor: null as number | null
  };

  public headerInformation = {
    pageTitle: 'Enviar Pix',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/send-pix' }
    ],
    saldo: 1000,
  }

  public sendLabel: string = 'Enviar';
  public footerInformation: string = '#1132 - Barbearia Orizon';
  public footerContext: string = '';
  public footerLabel: string = '';
  
  public accountData = {
    name: 'PixPay LTDA',
    key: 'testepix@celcoin.com.br',
    cnpj: '44.190.808/0001-54',
    keyType: 'E-MAIL',
    provider: 'Celcoin'
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  onChavePixChange(key: string): void {
    if (key && key.length >= 5) {
      this.showAccountData = true;
    } else {
      this.showAccountData = false;
    }
  }

  openConfirmationModal(): void {
    if (this.transferData.chavePix && this.transferData.valor && this.showAccountData) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha uma Chave PIX válida e o Valor.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.openConfirmationModal();
  }

  confirmTransfer(): void {
    console.log('Transferência confirmada:', this.transferData);
    
    this.transferData = { chavePix: '', valor: null };
    this.showAccountData = false;
    this.closeConfirmationModal();
    alert('Transferência enviada!');
  }
}