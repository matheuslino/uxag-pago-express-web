import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { Header } from '../../../shared/components/header/header';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';

@Component({
  selector: 'app-new',
  standalone: true, 
  imports: [
    WalletSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule 
  ],
  templateUrl: './new.html',
  styleUrl: './new.scss'
})
export class New {

  public razaoSocial: string = ''; 
  public apelido: string = '';

  public headerInformation = {
    pageTitle: 'Wallets',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/new' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova carteira',
      disabled: true,
      onClick: () => {
      }
    }
  }

  public menuAbertoIndex: number | null = null;

  constructor(private router: Router) { }

}