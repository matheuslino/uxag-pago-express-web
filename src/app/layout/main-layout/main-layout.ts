import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isDashboardRoute = true;
  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.isDashboardRoute = this.currentRoute === '/dashboard';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}