import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

interface MenuState {
  [key: string]: boolean;
}

@Component({
  selector: 'app-wallet-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './wallet-sidebar.html',
  styleUrl: './wallet-sidebar.scss'
})
export class WalletSidebar implements OnInit {

  currentUrl = '';
  expandedMenus: MenuState = {};

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  toggleMenu(menuKey: string): void {
    this.expandedMenus[menuKey] = !this.expandedMenus[menuKey];
  }

  isMenuExpanded(menuKey: string): boolean {
    return this.expandedMenus[menuKey] || false;
  }

  isActiveRoute(routes: string[]): boolean {
    return routes.some(route => 
      this.currentUrl === route || this.currentUrl.startsWith(route + '/')
    );
  }

}
