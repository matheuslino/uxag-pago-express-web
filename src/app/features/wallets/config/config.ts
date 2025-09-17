import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';

interface ILinkedUser {
  cpfCnpj: string;
  name: string;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
  ],
  templateUrl: './config.html',
  styleUrl: './config.scss'
})
export class Config {
  public walletId: number | undefined;

  walletMenu: string = 'wallet';

  public newUserInput: string = '';

  public linkedUsers: ILinkedUser[] = [
    { cpfCnpj: '552.166.194-88', name: 'admin@123milhas' },
    { cpfCnpj: '069.234.956-10', name: 'admin@123milhas' },
    { cpfCnpj: '457.443.757-08', name: 'admin@123milhas' },
  ];

  public headerInformation = {
    pageTitle: 'Wallets',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova carteira',
      disabled: false,
      onClick: () => {
        this.router.navigate(['/wallets/new']);
      }
    }
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.walletId = Number(params.get('id') || '0');
    });
  }

  addUser(): void {
    if (!this.newUserInput.trim()) {
      return;
    }
    
    const newUser: ILinkedUser = {
      cpfCnpj: this.newUserInput,
      name: 'novo.admin@123milhas' 
    };

    this.linkedUsers.push(newUser);
    this.newUserInput = '';
  }

  removeUser(index: number): void {
    this.linkedUsers.splice(index, 1);
  }
}