import { Component, OnInit, LOCALE_ID, HostListener } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

registerLocaleData(localePt, 'pt-BR');

interface MenuItem {
  label: string;
  path: string;
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
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
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
  templateUrl: './header-dashboard.html',
  styleUrl: './header-dashboard.scss'
})
export class HeaderDashboard implements OnInit {
  imageLoaded = true;
  unreadNotifications = 0;
  addWalletPlaceholders: any[] = [];
  greeting = 'Bem-vindo novamente';
  isBalanceVisible = false;
  isScrolled = false;

  userName = 'Antônio Coutinho';
  userRole = 'Gerente de Contas';
  userEmail = 'antonio.coutinho@example.com';
  accountNumber = '#1132';
  totalBalance = 12200.50;
  balanceChangePercentage = 9;

  menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Painel' },
    { path: '/administracao', label: 'Administração' },
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
      title: 'Nova transação',
      message: 'Você recebeu um pagamento de R$ 1.250,00',
      isRead: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Relatório mensal',
      message: 'Seu relatório mensal está disponível',
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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }

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
  }
  
  toggleBalanceVisibility(): void {
    this.isBalanceVisible = !this.isBalanceVisible;
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
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/settings/profile']);
  }

    goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  goToDeposit(): void {
    this.router.navigate(['/wallets/deposit']);
  }

  goToTransfer(): void {
    this.router.navigate(['/wallets/transfer']);
  }
}
