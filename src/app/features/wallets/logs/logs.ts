import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';

interface ILogEntry {
  timestamp: string;
  date: string;
  details: {
    title: string;
    origin: string;
  };
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs {

  public logHistory: ILogEntry[] = [
    {
      timestamp: '04h16m17s',
      date: '08/06/2024',
      details: {
        title: 'Credenciais alteradas',
        origin: 'esb.page'
      }
    },
    {
      timestamp: '03h55m02s',
      date: '08/06/2024',
      details: {
        title: 'Login efetuado',
        origin: 'web.app'
      }
    },
    {
      timestamp: '15h30m45s',
      date: '07/06/2024',
      details: {
        title: 'Transferência realizada',
        origin: 'api.service'
      }
    }
  ];

    public headerInformation = {
    pageTitle: 'Wallets',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '' }
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