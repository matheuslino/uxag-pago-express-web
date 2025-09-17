import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

interface HeaderTitleModel {
  pageTitle: string;
  pageSubtitle: string;
  breadcrumb: BreadcrumbsModel[];
  actionButton?: ActionButton;
  actionButton2?: ActionButton;
  values?: ValueModel;
}

interface ValueModel {
  value?: string;
  percentage?: string;
  filterDays?: number;
}

interface BreadcrumbsModel {
  label: string;
  path: string;
}

interface ActionButton {
  actionLabel: string;
  disabled: boolean;
  onClick: () => void;
}

@Component({
  selector: 'app-header-title',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './header-title.html',
  styleUrl: './header-title.scss'
})
export class HeaderTitle {

  @Input() headerInformation: HeaderTitleModel | undefined;

  constructor(private router: Router) {
  }

  goBack() {
    this.router.navigate(['/dashboard'])
  }

}
