import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { FormsModule } from '@angular/forms';

export interface Cliente {
  id: number;
  nome: string;
  identificador: string;
  depositoPix: string;
  saquesPix: string;
  enviaPix: string;
  boleto: string;
  cartaoCredito: string;
  pgtoContas: string;
}

@Component({
  selector: 'app-list',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule,
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
  };

  public clientes: Cliente[] = [
    {
      id: 1,
      nome: '123 Milhas',
      identificador: '2023.876000137',
      depositoPix: 'Stark',
      saquesPix: 'Stark',
      enviaPix: 'ASAAS',
      boleto: 'Bradesco',
      cartaoCredito: 'Empreendimento',
      pgtoContas: '-'
    },
    {
      id: 2,
      nome: 'Phoenix Sauer',
      identificador: 'dina@starkmail.com',
      depositoPix: 'Stark',
      saquesPix: 'Stark',
      enviaPix: 'ASAAS',
      boleto: 'Bradesco',
      cartaoCredito: 'Empreendimento',
      pgtoContas: '-'
    },
    {
      id: 3,
      nome: 'Lena Striker',
      identificador: 'dina@starkmail.com',
      depositoPix: 'Stark',
      saquesPix: 'Stark',
      enviaPix: 'ASAAS',
      boleto: 'Bradesco',
      cartaoCredito: 'Empreendimento',
      pgtoContas: '-'
    },
    {
      id: 4,
      nome: 'Devi Wilkinson',
      identificador: 'dina@starkmail.com',
      depositoPix: 'Stark',
      saquesPix: 'Stark',
      enviaPix: 'ASAAS',
      boleto: 'Bradesco',
      cartaoCredito: 'Empreendimento',
      pgtoContas: '-'
    },
    {
      id: 5,
      nome: 'Centeic Wu',
      identificador: 'dina@starkmail.com',
      depositoPix: 'Stark',
      saquesPix: 'Stark',
      enviaPix: 'ASAAS',
      boleto: 'Bradesco',
      cartaoCredito: 'Empreendimento',
      pgtoContas: '-'
    }
  ];

  public filtros = {
    buscar: '',
    nome: '',
    cnpj: ''
  };

  get totalRegistros(): number {
    return this.clientes.length;
  }

  onEditarCliente(cliente: Cliente): void {
    console.log('Editar cliente:', cliente);
  }

  onExcluirCliente(cliente: Cliente): void {
    console.log('Excluir cliente:', cliente);
  }
}