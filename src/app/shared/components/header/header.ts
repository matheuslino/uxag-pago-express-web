import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  active: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'app-header',
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
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  userName = 'Antônio Countinho';
  userRole = 'Gerente de Contas';
  userEmail = 'antonio.coutinho@example.com';

  menuItems: MenuItem[] = [
    { label: 'Painel', path: '/dashboard', active: true },
    { label: 'Administração', path: '/administracao', active: false },
    { label: 'Carteira', path: '/carteira', active: false },
    { label: 'Transações', path: '/transacoes', active: false },
    { label: 'Relatórios', path: '/relatorios', active: false }
  ];

  currentUser: User = {
    name: 'Antônio Coutinho',
    email: 'antonio@example.com',
    role: 'Gerente de Contas'
  };

  searchQuery: string = '';
  currentLanguage: string = 'F';
  imageLoaded: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  getUserInitials(): string {
    if (!this.currentUser.name) return 'AC';
    return this.currentUser.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  onImageError(event: any): void {
    this.imageLoaded = false;
  }

  navigateToItem(item: MenuItem): void {
    this.menuItems.forEach(menu => menu.active = false);
    item.active = true;
    this.router.navigate([item.path]);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  openMessages(): void {
    this.router.navigate(['/messages']);
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true;
  }

  viewAllNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/perfil']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }
}