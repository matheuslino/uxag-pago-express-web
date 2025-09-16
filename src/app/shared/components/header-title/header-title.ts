import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface HeaderTitleModel {
  pageTitle: string,
  pageSubtitle: string,
  breadcrumb: BreadcrumbsModel[],
  actionButton?: ActionButton,
  values?: ValueModel;
}

interface ValueModel {
  value?: string;
  percentage?: string;
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

}
