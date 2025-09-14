import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
  ],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications {

  public headerInformation = {
    pageTitle: 'Notificações',
    pageSubtitle: 'Texto complementar abaixo',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Notificações', path: '/administracao/notifications' }
    ],
  }

}
