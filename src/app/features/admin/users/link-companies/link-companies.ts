import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ConfirmDeactivateModalComponent } from '../../../../shared/components/confirm-deactivate-modal.component/confirm-deactivate-modal.component';

@Component({
  selector: 'app-link-companies',
  standalone: true,
  imports: [AdminSidebar, HeaderTitle],
  templateUrl: './link-companies.html',
  styleUrl: './link-companies.scss'
})
export class LinkCompanies {

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
