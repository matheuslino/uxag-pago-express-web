import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';

interface Empresa {
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
      razaoSocial: 'FASTCOMMERCE',
      cnpj: '34.192.109/0001-23',
      numeroCarteira: '5131',
      apelido: 'Primeira carteira'
    },
    {
      razaoSocial: 'Smart Fit',
      cnpj: '34.192.109/0001-23',
      numeroCarteira: '0123',
      apelido: 'Segunda carteira'
    }
  ];

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
    if (this.menuAbertoIndex === index) {
      this.menuAbertoIndex = null;
    } else {
      this.menuAbertoIndex = index;
    }
  }

  public fecharMenu(): void {
    this.menuAbertoIndex = null;
  }

  public editar(empresa: Empresa): void {
    this.router.navigateByUrl("/edit");
    this.fecharMenu();
  }

  public configurar(empresa: Empresa): void {
    console.log('Configurar clicado para:', empresa.razaoSocial);
    this.fecharMenu();
  }

  public verLogs(empresa: Empresa): void {
    console.log('Ver logs clicado para:', empresa.razaoSocial);
    this.fecharMenu();
  }
}
