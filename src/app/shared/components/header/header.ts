import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { filter, map } from 'rxjs/operators';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  imageLoaded = true;
  unreadNotifications = 3;

  menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Painel', icon: 'dashboard' },
    { path: '/admin', label: 'Administração', icon: 'people' },
    { path: '/wallets', label: 'Carteira', icon: 'account_balance_wallet' }
  ];

  notifications: Notification[] = [
    {
      id: '1',
      title: 'PIX Recebido',
      message: 'Você recebeu R$ 250,00 via PIX de João Silva',
      isRead: false,
      createdAt: new Date('2024-01-20T10:30:00')
    },
    {
      id: '2',
      title: 'Transferência Realizada',
      message: 'Transferência de R$ 1.500,00 realizada com sucesso',
      isRead: false,
      createdAt: new Date('2024-01-19T14:15:00')
    },
    {
      id: '3',
      title: 'Nova chave PIX cadastrada',
      message: 'Sua chave PIX por telefone foi cadastrada com sucesso',
      isRead: false,
      createdAt: new Date('2024-01-20T08:00:00')
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Atualizar item ativo baseado na rota atual
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url => {
        this.updateActiveMenuItem(url);
      });

    // Calcular notificações não lidas
    this.updateUnreadCount();
  }

  private updateActiveMenuItem(url: string): void {
    this.menuItems.forEach(item => {
      item.active = url.startsWith(item.path);
    });
  }

  private updateUnreadCount(): void {
    this.unreadNotifications = this.notifications.filter(n => !n.isRead).length;
  }

  onImageError(event: any): void {
    console.log('Erro ao carregar imagem:', event);
    this.imageLoaded = false;
  }

  getUserInitials(): string {
    return 'AC';
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true;
    this.updateUnreadCount();
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}
