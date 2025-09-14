import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';

interface IBalance {
  razaoSocial: {
    name: string;
    cnpj: string;
  };
  carteira: string;
  apelido: string;
  valor: number;
}

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, HeaderTitle, WalletSidebar],
  templateUrl: './balance.html',
  styleUrl: './balance.scss'
})
export class Balance {

  public headerInformation = {
    pageTitle: 'Saldo',
    pageSubtitle: 'Consulte seu saldo',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Saldo', path: '/wallets/balance' }
    ],
  }

  public balances: IBalance[] = [
    {
      razaoSocial: { name: 'Max Milhas', cnpj: '16.988.607/0001-61' },
      carteira: '531',
      apelido: 'Default',
      valor: 239.12
    },
    {
      razaoSocial: { name: 'HOOPAY', cnpj: '16.988.607/0001-61' },
      carteira: '531',
      apelido: 'Cliente Oficial',
      valor: 3918.12
    },
    {
      razaoSocial: { name: 'HOOPAY', cnpj: '16.988.607/0001-61' },
      carteira: '531',
      apelido: 'Cliente Oficial',
      valor: 3918.12
    },
    {
      razaoSocial: { name: 'HOOPAY', cnpj: '16.988.607/0001-61' },
      carteira: '531',
      apelido: 'Cliente Oficial',
      valor: 3918.12
    },
    {
      razaoSocial: { name: 'HOOPAY', cnpj: '16.988.607/0001-61' },
      carteira: '531',
      apelido: 'Cliente Oficial',
      valor: 3918.12
    }
  ];

  removeBalance(index: number): void {
    this.balances.splice(index, 1);
  }
}