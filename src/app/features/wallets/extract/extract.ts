import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { CustomSelect } from '../../../shared/components/custom-select/custom-select';

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
    ReactiveFormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
    CustomSelect
  ],
  templateUrl: './extract.html',
  styleUrl: './extract.scss'
})
export class Extract implements OnInit, OnDestroy {
  transactions: Transaction[] = [
    {
      type: 'Envio',
      date: new Date('2025-03-07T15:58:00'),
      totalValue: 7.01,
      taxValue: 0.01,
      clientValue: 7.0,
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
      clientValue: 7.0,
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
      clientValue: 7.0,
      commissionValue: null,
      status: 'Devolução',
      id: 1134,
      client: 'Client A',
      wallet: 'Wallet 1'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-06T11:20:00'),
      totalValue: 15.5,
      taxValue: 0.5,
      clientValue: 15.0,
      commissionValue: null,
      status: 'Crédito',
      id: 1131,
      client: 'Client C',
      wallet: 'Wallet 3'
    },
    {
      type: 'Recebimento',
      date: new Date('2025-03-06T09:05:00'),
      totalValue: 100.0,
      taxValue: 1.0,
      clientValue: 99.0,
      commissionValue: null,
      status: 'Crédito',
      id: 1130,
      client: 'Client B',
      wallet: 'Wallet 2'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-05T18:45:00'),
      totalValue: 25.0,
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
      totalValue: 5.0,
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
      totalValue: 50.0,
      taxValue: 0.0,
      clientValue: 50.0,
      commissionValue: null,
      status: 'Devolução',
      id: 1127,
      client: 'Client B',
      wallet: 'Wallet 2'
    },
    {
      type: 'Envio',
      date: new Date('2025-03-04T10:15:00'),
      totalValue: 8.1,
      taxValue: 0.1,
      clientValue: 8.0,
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
    values: {
      value: 'R$ 189,000',
      percentage: '7%',
      filterDays: 7
    },
    actionButton: {
      actionLabel: 'movimentar',
      disabled: false,
      onClick: () => {}
    },
    actionButton2: {
      actionLabel: 'exportar',
      disabled: false,
      onClick: () => {}
    }
  };

  public menuAbertoIndex: number | null = null;

  startDate: string = '';
  endDate: string = '';

  public clientControl = new FormControl('');
  public walletControl = new FormControl('');

  public clients = [
    { value: 'Client A', label: 'Client A' },
    { value: 'Client B', label: 'Client B' },
    { value: 'Client C', label: 'Client C' }
  ];

  public wallets = [
    { value: 'Wallet 1', label: 'Wallet 1' },
    { value: 'Wallet 2', label: 'Wallet 2' },
    { value: 'Wallet 3', label: 'Wallet 3' }
  ];

  filteredTransactions: Transaction[] = [];
  private subs: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.applyFilters();

    // reatividade nos selects
    this.subs.push(
      this.clientControl.valueChanges.subscribe(() => this.applyFilters()),
      this.walletControl.valueChanges.subscribe(() => this.applyFilters())
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  applyFilters(): void {
    let filtered = this.transactions;

    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => t.date >= start && t.date <= end);
    }

    if (this.clientControl.value) {
      filtered = filtered.filter(t => t.client === this.clientControl.value);
    }

    if (this.walletControl.value) {
      filtered = filtered.filter(t => t.wallet === this.walletControl.value);
    }

    this.filteredTransactions = filtered;
  }

  resetFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.clientControl.setValue('');
    this.walletControl.setValue('');
    this.applyFilters();
  }
}
