import { Component } from '@angular/core';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ProfileSidebarComponent } from '../../../shared/components/profile-sidebar/profile-sidebar';
import { ActivatedRoute } from '@angular/router';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-my-data',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileSidebarComponent,
    FooterInfo,
    HeaderTitle,
  ],
  templateUrl: './my-data.html',
  styleUrls: ['./my-data.scss'],
  standalone: true,
})
export class MyData {

  public headerInformation = {
    pageTitle: 'Perfil',
    pageSubtitle: 'Acompanhe os dados do seu perfil',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Transacões', path: '/transacoes' },
      { label: 'Pagamento', path: '/transacoes/payment' }
    ],
  }

  public sendLabel: string = 'Salvar';
  public footerInformation: string = '001';
  public footerContext: string = 'Perfil';
  public footerLabel: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    alert('salvar');
  }

}
