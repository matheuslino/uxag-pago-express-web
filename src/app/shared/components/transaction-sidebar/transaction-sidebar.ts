import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

interface MenuState {
  [key: string]: boolean;
}

@Component({
  selector: 'app-transaction-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './transaction-sidebar.html',
  styleUrl: './transaction-sidebar.scss'
})
export class TransactionSidebar implements OnInit {

  @Input() id?: number;
  @Input() menuSelected?: string;

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
