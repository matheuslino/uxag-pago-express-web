import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-batch-bank',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
  ],
  templateUrl: './batch-bank.html',
  styleUrl: './batch-bank.scss'
})
export class BatchBank {

  public headerInformation = {
    pageTitle: 'Banco em lote',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Alterar banco em lote', path: '/administracao/batch-bank' }
    ],
  }

}
