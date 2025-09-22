import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CustomSelect } from '../../../shared/components/custom-select/custom-select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-logs',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CustomSelect,
  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs {

  public headerInformation = {
    pageTitle: 'Relatório de logs',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Logs', path: '/administracao/logs' }
    ],
  }

  public profileOptions = [
    { value: 'ADMIN', label: 'Admin' },
  ];

  public profileControl = new FormControl('todos');

}
