import { Component } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';

@Component({
  selector: 'app-logs',
  imports: [AdminSidebar, HeaderTitle],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs {
  
  public headerInformation = {
    pageTitle: 'Usuários',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Usuários', path: '/administracao/users' }
    ],
  };
}
