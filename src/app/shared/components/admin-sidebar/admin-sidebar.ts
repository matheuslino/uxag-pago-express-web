import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  MatIconModule,
} from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss'
})
export class AdminSidebar  implements OnInit {

  currentUrl = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  isActiveRoute(routes: string[]): boolean {
    return routes.some(route => this.currentUrl === route || this.currentUrl.startsWith(route + '/'));
  }

  ngOnInit(): void {
  }
}
