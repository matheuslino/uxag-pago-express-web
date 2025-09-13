import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    CommonModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  
  public headerInformation = {
    pageTitle: 'Clientes',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Clientes', path: '/administracao/clients' }
    ],
  }

}
