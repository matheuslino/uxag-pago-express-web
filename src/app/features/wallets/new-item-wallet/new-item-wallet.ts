import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

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
    FooterInfo, // ✅ Adicionado FooterInfo
  ],
  templateUrl: './new-item-wallet.html',
  styleUrl: './new-item-wallet.scss'
})
export class NewItemWallet {

  // ✅ Propriedades para o footer-info
  public sendLabel: string = 'Salvar';
  public footerInformation: string = '#1132 - Barbearia Orizon';
  public footerContext1: string = 'Cadastro de item';
  public footerContext2: string = 'Valor pago indevido que voltou à conta';
  public walletMenu: string = 'new-item-wallet';

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

  constructor(
    private router: Router,
    private location: Location // ✅ Adicionado Location para navegação
  ) { }

  // ✅ Método para cancelar (volta para página anterior)
  onCancel(): void {
    this.location.back();
  }

  // ✅ Método saveItem atualizado (chamado pelo footer-info)
  saveItem(): void {
    if(!this.formData.valor || !this.formData.carteira) {
      alert('Por favor, preencha os campos Carteira e Valor.');
      return;
    }
    
    console.log('Salvando item:', this.formData);
    alert('Item salvo com sucesso!');
    
    // ✅ Resetar formulário após salvar
    this.formData = {
      carteira: '',
      tipo: 'Crédito',
      valor: null,
      observacao: ''
    };
    
  }
}