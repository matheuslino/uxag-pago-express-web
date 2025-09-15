import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';

@Component({
  selector: 'app-new-item-wallet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
  ],
  templateUrl: './new-item-wallet.html',
  styleUrl: './new-item-wallet.scss'
})
export class NewItemWallet {

  public formData = {
    carteira: '',
    tipo: 'Crédito',
    valor: null as number | null,
    observacao: ''
  };
  
  public headerInformation = {
    pageTitle: 'Cadastrar item na carteira',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/list' }
    ],
  }

  public menuAbertoIndex: number | null = null;

  constructor(private router: Router) { }

  saveItem(): void {
    if(!this.formData.valor || !this.formData.carteira) {
      alert('Por favor, preencha os campos Carteira e Valor.');
      return;
    }
    console.log('Salvando item:', this.formData);
    alert('Item salvo com sucesso!');
    this.formData = {
      carteira: '',
      tipo: 'Crédito',
      valor: null,
      observacao: ''
    };
  }
}