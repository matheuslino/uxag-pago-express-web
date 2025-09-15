import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { filter, map, Subject, switchMap, takeUntil } from 'rxjs';
import { Header } from '../../shared/components/header/header';
import { RelatoriosSidebar } from '../../shared/components/relatorios-sidebar/relatorios-sidebar.component';

interface BreadcrumbItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-relatorios',
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    Header,
    RelatoriosSidebar
  ],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.scss']
})
export class Relatorios implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private currentRoute: string = '';

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