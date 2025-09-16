import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-client-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './client-sidebar.html',
  styleUrl: './client-sidebar.scss'
})
export class ClientSidebar {

  @Input() id?: number;

  currentUrl = '';
  
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

  isActiveRoute(routes: string[]): boolean {
    return routes.some(route => 
      this.currentUrl === route || this.currentUrl.startsWith(route + '/')
    );
  }
}
