import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bank-accounts',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
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

}
