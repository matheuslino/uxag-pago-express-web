import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';

interface Empresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  numeroCarteira: string;
  apelido: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  public empresas: Empresa[] = [
    {
      id: 1,
      razaoSocial: 'FASTCOMMERCE',
      cnpj: '34.192.109/0001-23',
      numeroCarteira: '5131',
      apelido: 'Primeira carteira'
    },
    {
      id: 2,
      razaoSocial: 'Smart Fit',
      cnpj: '34.192.109/0001-23',
      numeroCarteira: '0123',
      apelido: 'Segunda carteira'
    }
  ];

  // Lista filtrada
  public empresasFiltradas: Empresa[] = [...this.empresas];

  // Filtros
  public filtroRazaoSocial: string = '';
  public filtroNumeroCarteira: string = '';
  public filtroApelido: string = '';

  public headerInformation = {
    pageTitle: 'Wallets',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/list' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova carteira',
      disabled: false,
      onClick: () => {
        this.router.navigate(['/wallets/new']);
      }
    }
  }

  public menuAbertoIndex: number | null = null;

  constructor(private router: Router) { }

  public toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.menuAbertoIndex = this.menuAbertoIndex === index ? null : index;
  }

  public fecharMenu(): void {
    this.menuAbertoIndex = null;
  }

  public editar(empresa: Empresa): void {
    this.router.navigateByUrl(`/carteira/wallets/edit/${empresa.id}`);
    this.fecharMenu();
  }

  public configurar(empresa: Empresa): void {
    this.router.navigateByUrl(`/carteira/wallets/config/${empresa.id}`);
    this.fecharMenu();
  }

  public verLogs(empresa: Empresa): void {
    this.router.navigateByUrl(`/carteira/wallets/logs/${empresa.id}`);
    this.fecharMenu();
  }

  // Função de filtro
  public aplicarFiltros(): void {
    this.empresasFiltradas = this.empresas.filter(e =>
      (!this.filtroRazaoSocial || e.razaoSocial.toLowerCase().includes(this.filtroRazaoSocial.toLowerCase())) &&
      (!this.filtroNumeroCarteira || e.numeroCarteira.includes(this.filtroNumeroCarteira)) &&
      (!this.filtroApelido || e.apelido.toLowerCase().includes(this.filtroApelido.toLowerCase()))
    );
  }

}
