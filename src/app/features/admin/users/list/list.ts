import { Component, OnInit, HostListener } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ConfirmDeactivateModalComponent } from '../../../../shared/components/confirm-deactivate-modal.component/confirm-deactivate-modal.component';
import { MatDialog } from '@angular/material/dialog';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  razaoSocial: string;
  emailRazaoSocial: string;
  perfil: string;
  emailPerfil: string;
  status: 'Active' | 'Inactive';
}

export interface MenuAcao {
  label: string;
  icon: string;
  action: string;
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
export class List implements OnInit {

  constructor(private router: Router , private dialog: MatDialog) {}


  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  public headerInformation = {
    pageTitle: 'Usuários',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Usuários', path: '/administracao/users' }
    ],
  };

  public usuarios: Usuario[] = [
    {
      id: 1,
      nome: '123 Milhas',
      email: 'admin@123milhas.com',
      razaoSocial: '123 Milhas',
      emailRazaoSocial: 'admin@123milhas.com',
      perfil: 'Cashin/Cashout',
      emailPerfil: 'admin@123milhas.com',
      status: 'Active'
    },
    {
      id: 2,
      nome: 'Phoenix Baker',
      email: 'lara.steiner@123milhas.com',
      razaoSocial: 'Stark',
      emailRazaoSocial: 'olivia@unittledui.com',
      perfil: 'Cashin/Cashout',
      emailPerfil: 'admin@123milhas.com',
      status: 'Active'
    },
    {
      id: 3,
      nome: 'Lara Steiner',
      email: 'lara.steiner@123milhas.com',
      razaoSocial: 'Stark',
      emailRazaoSocial: 'olivia@unittledui.com',
      perfil: 'Cashin/Cashout',
      emailPerfil: 'admin@123milhas.com',
      status: 'Active'
    },
    {
      id: 4,
      nome: 'João Silva',
      email: 'joao@empresa.com',
      razaoSocial: 'Silva & Associados',
      emailRazaoSocial: 'contato@silva.com',
      perfil: 'Admin',
      emailPerfil: 'admin@silva.com',
      status: 'Inactive'
    },
    {
      id: 5,
      nome: 'Maria Santos',
      email: 'maria@tech.com',
      razaoSocial: 'Tech Solutions',
      emailRazaoSocial: 'info@tech.com',
      perfil: 'User',
      emailPerfil: 'user@tech.com',
      status: 'Active'
    },
    {
      id: 6,
      nome: 'Pedro Costa',
      email: 'pedro@costa.com',
      razaoSocial: 'Costa Ltda',
      emailRazaoSocial: 'contato@costa.com',
      perfil: 'Manager',
      emailPerfil: 'manager@costa.com',
      status: 'Active'
    },
    {
      id: 7,
      nome: 'Ana Oliveira',
      email: 'ana@oliveira.com',
      razaoSocial: 'Oliveira Corp',
      emailRazaoSocial: 'corp@oliveira.com',
      perfil: 'User',
      emailPerfil: 'user@oliveira.com',
      status: 'Inactive'
    },
    {
      id: 8,
      nome: 'Carlos Lima',
      email: 'carlos@lima.com',
      razaoSocial: 'Lima Enterprises',
      emailRazaoSocial: 'enterprise@lima.com',
      perfil: 'Admin',
      emailPerfil: 'admin@lima.com',
      status: 'Active'
    },
    {
      id: 9,
      nome: 'Luciana Ferreira',
      email: 'luciana@ferreira.com',
      razaoSocial: 'Ferreira & Cia',
      emailRazaoSocial: 'cia@ferreira.com',
      perfil: 'Manager',
      emailPerfil: 'manager@ferreira.com',
      status: 'Active'
    }
  ];

  public filtros = {
    cliente: '',
    nome: '',
    cnpj: ''
  };

  public menuAcoes: MenuAcao[] = [
    { label: 'Editar', icon: '/img/person.svg', action: 'editar' },
    { label: 'Credenciais', icon: '/img/Frame.svg', action: 'credenciais' },
    { label: 'Vincular empresas', icon: '/img/zap.svg', action: 'vincular' },
    { label: 'Desativar', icon: '/img/house.svg', action: 'desativar' },
    { label: 'Ver logs', icon: '/img/logs.svg', action: 'logs' }
  ];

  // Paginação
  public paginaAtual = 1;
  public itensPorPagina = 10;
  public totalPaginas = 0;
  public paginas: (number | string)[] = [];

  // Menu dropdown
  public menuAbertoId: number | null = null;

  get totalRegistros(): number {
    return this.usuarios.length;
  }

  get usuariosPaginados(): Usuario[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.usuarios.slice(inicio, fim);
  }

  atualizarPaginacao(): void {
    this.totalPaginas = Math.ceil(this.totalRegistros / this.itensPorPagina);
    this.paginas = this.gerarPaginas();
  }

  gerarPaginas(): (number | string)[] {
    const paginas: (number | string)[] = [];
    const totalPaginas = this.totalPaginas;
    const atual = this.paginaAtual;

    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      paginas.push(1);

      if (atual <= 4) {
        for (let i = 2; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (atual >= totalPaginas - 3) {
        paginas.push('...');
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push('...');
        for (let i = atual - 1; i <= atual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      }
    }

    return paginas;
  }

  irParaPagina(pagina: number | string): void {
    if (typeof pagina === 'number' && pagina !== this.paginaAtual) {
      this.paginaAtual = pagina;
      this.atualizarPaginacao();
    }
  }

  toggleMenu(usuarioId: number, event: Event): void {
    event.stopPropagation();
    this.menuAbertoId = this.menuAbertoId === usuarioId ? null : usuarioId;
  }

  @HostListener('document:click', ['$event'])
  fecharMenu(event: Event): void {
    this.menuAbertoId = null;
  }

  executarAcao(acao: string, usuario: Usuario, event: Event): void {
    event.stopPropagation();
    this.menuAbertoId = null;

    switch (acao) {
      case 'editar':
        this.editarUsuario(usuario);
        break;
      case 'credenciais':
        this.gerenciarCredenciais(usuario);
        break;
      case 'vincular':
        this.vincularEmpresas(usuario);
        break;
      case 'desativar':
        this.desativarUsuario(usuario);
        break;
      case 'logs':
        this.verLogs(usuario);
        break;
    }
  }

  private editarUsuario(usuario: Usuario): void {
    console.log('Editar usuário:', usuario);
    this.router.navigate(['/administracao/users/edit']);
  }

  private gerenciarCredenciais(usuario: Usuario): void {
    console.log('Gerenciar credenciais:', usuario);
    this.router.navigate(['/administracao/users/credentials']);
  }

  private vincularEmpresas(usuario: Usuario): void {
    console.log('Vincular empresas:', usuario);
    this.router.navigate(['/administracao/users/credentials']);

  }

  private desativarUsuario(usuario: Usuario): void {
    console.log('Desativar usuário:', usuario);
      const dialogRef = this.dialog.open(ConfirmDeactivateModalComponent, {
        data: { name: 'Adeilton Alves Junior' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Usuário confirmado para desativação');
        }
      });
  }

  private verLogs(usuario: Usuario): void {
    console.log('Ver logs:', usuario);
    this.router.navigate(['/administracao/users/logs']);
  }
}