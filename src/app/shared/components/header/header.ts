import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { filter, map } from 'rxjs/operators';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

interface MenuItem {
  path: string;
  label: string;
  active?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface Wallet {
  nome: string;
  saldo: number;
}


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatSidenavModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  imageLoaded = true;
  unreadNotifications = 0;
  addWalletPlaceholders: any[] = [];
  greeting = '';
  isBalanceVisible = false;

  userName = 'Antônio';
  userRole = 'Gerente de Contas';
  userEmail = 'antonio.coutinho@example.com';
  accountNumber = '#1132';
  totalBalance = 12200.50;
  balanceChangePercentage = 9;

  menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Painel' },
    { path: '/admin', label: 'Administração' },
    { path: '/wallets', label: 'Carteira' },
    { path: '/transacoes', label: 'Transações' },
    { path: '/relatorios', label: 'Relatórios' }
  ];

  wallets: Wallet[] = [
    { nome: 'Barbearia Shelton', saldo: 1422.09 },
    { nome: 'Soares Distribuidora', saldo: 3413.09 },
  ];

  notifications: Notification[] = [
    {
      id: '1',
      title: 'PIX Recebido',
      message: 'Você recebeu R$ 250,00 via PIX de João Silva',
      isRead: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Transferência Realizada',
      message: 'Transferência de R$ 1.500,00 realizada com sucesso',
      isRead: false,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
    },
    {
      id: '3',
      title: 'Nova chave PIX cadastrada',
      message: 'Sua chave PIX por telefone foi cadastrada com sucesso',
      isRead: true,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url => {
        this.updateActiveMenuItem(url);
      });

    this.updateActiveMenuItem(this.router.url);
    this.updateUnreadCount();
    this.setupWalletPlaceholders();
    this.setGreeting();
  }
  
  toggleBalanceVisibility(): void {
    this.isBalanceVisible = !this.isBalanceVisible;
  }

  private setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Bom dia';
    } else if (hour < 18) {
      this.greeting = 'Boa tarde';
    } else {
      this.greeting = 'Boa noite';
    }
  }

  private setupWalletPlaceholders(): void {
    const maxSlots = 3;
    const placeholderCount = this.wallets.length < maxSlots 
      ? maxSlots - this.wallets.length 
      : 0;
    this.addWalletPlaceholders = Array(placeholderCount).fill(0);
  }

  private updateActiveMenuItem(url: string): void {
    this.menuItems.forEach(item => {
      item.active = url.startsWith(item.path);
    });
  }

  private updateUnreadCount(): void {
    this.unreadNotifications = this.notifications.filter(n => !n.isRead).length;
  }

  onImageError(): void {
    this.imageLoaded = false;
  }

  getUserInitials(): string {
    const names = this.userName.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return this.userName.substring(0, 2).toUpperCase();
  }

  markAsRead(notification: Notification): void {
    if (!notification.isRead) {
      notification.isRead = true;
      this.updateUnreadCount();
    }
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}