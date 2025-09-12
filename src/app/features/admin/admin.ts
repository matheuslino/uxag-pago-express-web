import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminSidebar } from '../../shared/components/admin-sidebar/admin-sidebar';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { filter, takeUntil, map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface BreadcrumbItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-admin',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    CommonModule,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private currentRoute: string = '';

  // Propriedades do header
  pageTitle: string = '';
  pageSubtitle: string = '';
  breadcrumbItems: BreadcrumbItem[] = [];
  showActionButton: boolean = false;
  actionLabel: string = 'Adicionar';
  actionIcon: string = 'add';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap(route => route.data),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.updatePageData(data);
      });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updatePageData(routeData: any): void {
    this.pageTitle = routeData.pageTitle || '';
    this.pageSubtitle = routeData.pageSubtitle || '';
    this.breadcrumbItems = routeData.breadcrumb || [];
    this.showActionButton = routeData.actionButton?.show || false;
    this.actionLabel = routeData.actionButton?.label || 'Adicionar';
    this.actionIcon = routeData.actionButton?.icon || 'add';
  }

  onHeaderAction(): void {
    switch (true) {
      case this.currentRoute.includes('/administracao/users'):
        this.addNewUser();
        break;
      case this.currentRoute.includes('/administracao/transactions'):
        this.addNewTransaction();
        break;
      
      default:
        console.log('Ação não definida para esta rota:', this.currentRoute);
    }
  }

  private addNewUser(): void {
    this.router.navigate(['/administracao/users/new']);
  }

  private addNewTransaction(): void {
    this.router.navigate(['/administracao/transactions/new']);
  }

  updateTitle(title: string, subtitle?: string): void {
    this.pageTitle = title;
    if (subtitle) {
      this.pageSubtitle = subtitle;
    }
  }

  updateBreadcrumb(breadcrumb: BreadcrumbItem[]): void {
    this.breadcrumbItems = breadcrumb;
  }
}
