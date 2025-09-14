import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
  ],
  templateUrl: './new.html',
  styleUrl: './new.scss'
})
export class New {

  public headerInformation = {
    pageTitle: 'Chaves PIX',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Chaves PIX', path: '/administracao/pix/new' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova chave',
      disabled: true,
      onClick: () => {
      }
    }
  }

  constructor(
    private router: Router,
  ) { }

}
