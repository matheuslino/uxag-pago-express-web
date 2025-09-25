import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { Header } from '../../../shared/components/header/header';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-new',
  standalone: true, 
  imports: [
    WalletSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterInfo,
  ],
  templateUrl: './new.html',
  styleUrl: './new.scss'
})
export class New {

  public sendLabel: string = 'Salvar';
  public razaoSocial: string = ''; 
  public apelido: string = '';
  public footerInformation: string = '#1132 Barbearia Orizon';
  public footerContext: string = '123 Milhas';
  public footerLabel: string = 'Carteira oficial';

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

  constructor(
    private router: Router,
    private location: Location
  ) { }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.location.back();
  }

}