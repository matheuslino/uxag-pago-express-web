import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';

export interface Transaction {
  type: string;
  date: Date;
  totalValue: number;
  taxValue: number;
  clientValue: number;
  commissionValue: number | null;
  status: 'Crédito' | 'Devolução';
  id: number;
  client: string;
  wallet: string;
}

@Component({
  selector: 'app-extract',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
  ],
  templateUrl: './extract.html',
  styleUrl: './extract.scss'
})
export class Extract {
  transactions: Transaction[] = [
    {
      type: 'Envio',
      date: new Date('2025-03-07T15:58:00'),
      totalValue: 7.01,
      taxValue: 0.01,
      clientValue: 7.00,
      commissionValue: null,
      status: 'Crédito',
      id: 1132,
      client: 'Client A',
      wallet: 'Wallet 1'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-07T15:58:00'),
      totalValue: 7.01,
      taxValue: 0.01,
      clientValue: 7.00,
      commissionValue: null,
      status: 'Crédito',
      id: 1133,
      client: 'Client B',
      wallet: 'Wallet 2'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-07T15:58:00'),
      totalValue: 7.01,
      taxValue: 0.01,
      clientValue: 7.00,
      commissionValue: null,
      status: 'Devolução',
      id: 1134,
      client: 'Client A',
      wallet: 'Wallet 1'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-06T11:20:00'),
      totalValue: 15.50,
      taxValue: 0.50,
      clientValue: 15.00,
      commissionValue: null,
      status: 'Crédito',
      id: 1131,
      client: 'Client C',
      wallet: 'Wallet 3'
    },
    {
      type: 'Recebimento',
      date: new Date('2025-03-06T09:05:00'),
      totalValue: 100.00,
      taxValue: 1.00,
      clientValue: 99.00,
      commissionValue: null,
      status: 'Crédito',
      id: 1130,
      client: 'Client B',
      wallet: 'Wallet 2'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-05T18:45:00'),
      totalValue: 25.00,
      taxValue: 0.25,
      clientValue: 24.75,
      commissionValue: null,
      status: 'Crédito',
      id: 1129,
      client: 'Client A',
      wallet: 'Wallet 1'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-05T14:30:00'),
      totalValue: 5.00,
      taxValue: 0.01,
      clientValue: 4.99,
      commissionValue: null,
      status: 'Crédito',
      id: 1128,
      client: 'Client C',
      wallet: 'Wallet 3'
    },
    {
      type: 'Devolução',
      date: new Date('2025-03-04T12:00:00'),
      totalValue: 50.00,
      taxValue: 0.00,
      clientValue: 50.00,
      commissionValue: null,
      status: 'Devolução',
      id: 1127,
      client: 'Client B',
      wallet: 'Wallet 2'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-04T10:15:00'),
      totalValue: 8.10,
      taxValue: 0.10,
      clientValue: 8.00,
      commissionValue: null,
      status: 'Crédito',
      id: 1126,
      client: 'Client A',
      wallet: 'Wallet 1'
    }
  ];

  public headerInformation = {
    pageTitle: 'Extrato',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/list' }
    ],
    saldo: 1000,
  }

  public menuAbertoIndex: number | null = null;

  // Filter properties
  startDate: string = '';
  endDate: string = '';
  selectedClient: string = '';
  selectedWallet: string = '';

  clients: string[] = ['Client A', 'Client B', 'Client C'];
  wallets: string[] = ['Wallet 1', 'Wallet 2', 'Wallet 3'];

  filteredTransactions: Transaction[] = [];

  constructor(private router: Router) {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.transactions;

    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999); 
      filtered = filtered.filter(t => t.date >= start && t.date <= end);
    }

    if (this.selectedClient) {
      filtered = filtered.filter(t => t.client === this.selectedClient);
    }

    if (this.selectedWallet) {
      filtered = filtered.filter(t => t.wallet === this.selectedWallet);
    }

    this.filteredTransactions = filtered;
  }
}