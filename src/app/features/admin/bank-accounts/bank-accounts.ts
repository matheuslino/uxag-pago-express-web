import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';

interface BankAccount {
  name: string;
  code: string;
}

@Component({
  selector: 'app-bank-accounts',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
  ],
  templateUrl: './bank-accounts.html',
  styleUrl: './bank-accounts.scss'
})
export class BankAccounts {

  public headerInformation = {
    pageTitle: 'Contas bancárias',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Contas bancárias', path: '/administracao/bank-accounts' }
    ],
  }

  public bankAccounts: BankAccount[] = [
    { name: 'Asaas', code: '481' },
    { name: 'Banco do Brasil', code: '237' },
    { name: 'Bradesco', code: '011' },
    { name: 'Itaú', code: '159' },
    { name: 'Neon', code: '450' },
  ];

  get totalRecords(): number {
    return this.bankAccounts.length;
  }

}