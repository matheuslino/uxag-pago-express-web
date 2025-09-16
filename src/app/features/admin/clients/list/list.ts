import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
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
  constructor(private router: Router) {}

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

// formata e atualiza o CNPJ em tempo real
onCnpjInput(event: any): void {
  let value = event.target.value.replace(/\D/g, ''); // só números

  // limita a 14 dígitos (CNPJ)
  if (value.length > 14) {
    value = value.substring(0, 14);
  }

  // aplica a máscara: 00.000.000/0000-00
  if (value.length > 12) {
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, '$1.$2.$3/$4-$5');
  } else if (value.length > 8) {
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4');
  } else if (value.length > 5) {
    value = value.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2');
  }

  this.filtros.cnpj = value;
}
  // lista já filtrada (getter)
  get clientesFiltrados(): Cliente[] {
    return this.clientes.filter(cliente => {
      const busca = this.filtros.buscar.toLowerCase();
      const nome = this.filtros.nome.toLowerCase();
      const cnpj = this.filtros.cnpj.toLowerCase();

      return (
        // busca geral: checa em nome ou identificador
        (busca === '' ||
          cliente.nome.toLowerCase().includes(busca) ||
          cliente.identificador.toLowerCase().includes(busca)) &&

        // filtro nome específico
        (nome === '' ||
          cliente.nome.toLowerCase().includes(nome)) &&

        // filtro cnpj específico
        (cnpj === '' ||
          cliente.identificador.toLowerCase().includes(cnpj))
      );
    });
  }

  get totalRegistros(): number {
    return this.clientesFiltrados.length;
  }

  onEditarCliente(cliente: Cliente): void {
    this.router.navigate(['/administracao/clients/edit', cliente.id]);
  }

  onExcluirCliente(cliente: Cliente): void {
    console.log('Excluir cliente:', cliente);
  }
}
