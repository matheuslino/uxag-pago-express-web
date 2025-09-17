import { Component, OnInit } from '@angular/core';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ProfileSidebarComponent } from '../../../shared/components/profile-sidebar/profile-sidebar';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-my-company',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileSidebarComponent,
    FooterInfo,
    HeaderTitle,
  ],
  templateUrl: './my-company.html',
  styleUrls: ['./my-company.scss'],
  standalone: true,
})
export class MyCompany implements OnInit {

  public headerInformation = {
    pageTitle: 'Minha Empresa',
    pageSubtitle: 'Gerencie as informações da sua empresa',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Perfil', path: '/profile' },
      { label: 'Minha Empresa', path: '/profile/my-company' }
    ],
  };

  public sendLabel: string = 'Entrar em modo de edição';
  public footerInformation: string = '#1132';
  public footerContext: string = 'Dados da empresa:';
  public footerLabel: string = 'Nome da Empresa';

  public isEditing: boolean = false;
  public companyForm!: FormGroup;

  // Mock company data
  private company = {
    name: 'Minha Empresa S.A.',
    cnpj: '00.000.000/0001-00',
    phone: '(11) 99999-9999',
    email: 'contato@minhaempresa.com.br'
  };

  constructor(
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: [this.company.name],
      cnpj: [this.company.cnpj],
      phone: [this.company.phone],
      email: [this.company.email]
    });

    this.companyForm.disable();
  }

  onCancel(): void {
    if (this.isEditing) {
      this.isEditing = false;
      this.sendLabel = 'Entrar em modo de edição';
      this.companyForm.reset(this.company);
      this.companyForm.disable();
    } else {
      this.location.back();
    }
  }

  onSubmit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.sendLabel = 'Salvar';
      this.companyForm.enable();
    } else {
      console.log('Dados salvos:', this.companyForm.value);
      this.sendLabel = 'Entrar em modo de edição';
      this.companyForm.disable();
      this.company = this.companyForm.value;
    }
  }
}
