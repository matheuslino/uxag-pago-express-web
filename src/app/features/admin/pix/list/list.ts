import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { CustomSelect } from '../../../../shared/components/custom-select/custom-select';

export interface Cliente {
  value: number;
  label: string;
}

export interface ChavePix {
  id: number;
  clienteId: number;
  empresa: string;
  tipoChave: 'CPF' | 'CNPJ' | 'Email' | 'Telefone' | 'Aleatória';
  chavePix: string;
  criadoPor: string;
  criadoEm: Date;
}

@Component({
  selector: 'app-list',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule,
    CustomSelect,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {

  public headerInformation = {
    pageTitle: 'Chaves PIX',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Chaves', path: '/administracao/pix/list' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova chave',
      disabled: false,
      onClick: () => {
        this.router.navigate(['/administracao/pix/new']);
      }
    }
  };

  public clientes: Cliente[] = [
    { value: 1, label: '123 Milhas' },
    { value: 2, label: 'Tech Solutions' },
    { value: 3, label: 'Stark Industries' },
    { value: 4, label: 'Acme Corp' }
  ];

  public chavesPix: ChavePix[] = [
    {
      id: 1,
      clienteId: 1,
      empresa: '123 Milhas',
      tipoChave: 'CPF',
      chavePix: '123.456.789-00',
      criadoPor: 'lucas_adm',
      criadoEm: new Date('2024-03-12T03:09:00')
    },
    {
      id: 2,
      clienteId: 1,
      empresa: '123 Milhas',
      tipoChave: 'Email',
      chavePix: 'financeiro@123milhas.com',
      criadoPor: 'maria_adm',
      criadoEm: new Date('2024-03-15T14:22:00')
    },
    {
      id: 3,
      clienteId: 1,
      empresa: '123 Milhas',
      tipoChave: 'CNPJ',
      chavePix: '12.345.678/0001-90',
      criadoPor: 'carlos_adm',
      criadoEm: new Date('2024-03-20T09:45:00')
    },
    {
      id: 4,
      clienteId: 2,
      empresa: 'Tech Solutions',
      tipoChave: 'Telefone',
      chavePix: '+55 11 99999-8888',
      criadoPor: 'admin_tech',
      criadoEm: new Date('2024-02-28T16:30:00')
    },
    {
      id: 5,
      clienteId: 2,
      empresa: 'Tech Solutions',
      tipoChave: 'Aleatória',
      chavePix: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      criadoPor: 'admin_tech',
      criadoEm: new Date('2024-03-01T11:15:00')
    },
    {
      id: 6,
      clienteId: 3,
      empresa: 'Stark Industries',
      tipoChave: 'Email',
      chavePix: 'payments@stark.com',
      criadoPor: 'stark_admin',
      criadoEm: new Date('2024-03-18T08:30:00')
    }
  ];
  
  public clientControl = new FormControl(1);

  public clienteSelecionadoId = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Inicialização se necessário
  }

  get clienteSelecionado(): Cliente | undefined {
    return this.clientes.find(c => c.value === this.clienteSelecionadoId);
  }

  get chavesFiltradas(): ChavePix[] {
    return this.chavesPix.filter(chave => chave.clienteId === this.clienteSelecionadoId);
  }

  get totalRegistros(): number {
    return this.chavesFiltradas.length;
  }

  onClienteChange(): void {
    // Método chamado quando o cliente é alterado
    console.log('Cliente alterado para:', this.clienteSelecionado);
  }

  onExcluirChave(chave: ChavePix): void {
    if (confirm(`Tem certeza que deseja excluir a chave PIX: ${chave.chavePix}?`)) {
      const index = this.chavesPix.findIndex(c => c.id === chave.id);
      if (index > -1) {
        this.chavesPix.splice(index, 1);
        console.log('Chave PIX excluída:', chave);
      }
    }
  }

  formatarDataHora(data: Date): string {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    
    return `${horas}h${minutos} - ${dia}/${mes}/${ano}`;
  }

  getTipoChaveIcon(tipoChave: string): string {
    const icons = {
      'CPF': '/img/user.svg',
      'CNPJ': '/img/building.svg',
      'Email': '/img/mail.svg',
      'Telefone': '/img/phone.svg',
      'Aleatória': '/img/hash.svg'
    };
    return icons[tipoChave as keyof typeof icons] || '/img/key.svg';
  }
}