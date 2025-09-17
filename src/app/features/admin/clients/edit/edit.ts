import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ClientSidebar } from '../../../../shared/components/client-sidebar/client-sidebar';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    ClientSidebar,
    HeaderTitle,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class EditClient {  
  clienteId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.clienteId = Number(params.get('id'));
    });
  }

  public headerInformation = {
    pageTitle: 'Clientes',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Clientes', path: '/administracao/clients' },
      { label: 'Editar Cliente', path: `/administracao/clients/edit/${this.clienteId}` }
    ],
  }
}
