import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../shared/components/header/header';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitle,
    WalletSidebar,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {

  public razaoSocial: string = '123 Milhas';
  public apelido: string = 'Default';
  public numeroCarteira: string = '11897';
  public valor: string = '0,00';

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
      disabled: false,
      onClick: () => {
        this.router.navigate(['/wallets/new']);
      }
    }
  }

  constructor(private router: Router) { }

}