import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ConfirmDeactivateModalComponent } from '../../../../shared/components/confirm-deactivate-modal.component/confirm-deactivate-modal.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterInfo } from '../../../../shared/components/footer-info/footer-info';
import { CommonModule, Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-link-companies',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    FooterInfo,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './link-companies.html',
  styleUrl: './link-companies.scss'
})
export class LinkCompanies implements OnInit, OnDestroy {

  public usuarioId: number | undefined;

  private subscription = new Subscription();


  empresas: any[] = [
    {
      cnpj: '26.669.170/0001-57',
      nomeFantasia: 'Stark Mobilias',
      razaoSocial: 'Stark Mobilias',
    },
  ];
  userForm!: FormGroup;

  usuarioMenu: string = 'usuario';
  nomeUsuarioAtual = '';
  empresaUsuarioAtual = '';
  searchTerm = '';
  companies = [
    {
      cnpj: '26.669.170/0001-57',
      nomeFantasia: 'Stark Mobilias',
      razaoSocial: 'Stark Mobilias',
    },
    {
      cnpj: '26.669.170/0001-57',
      nomeFantasia: 'Wayne Enterprises',
      razaoSocial: 'Wayne Enterprises',
    },
    {
      cnpj: '26.669.170/0001-57',
      nomeFantasia: 'Oscorp',
      razaoSocial: 'Oscorp',
    },
    {
      cnpj: '26.669.170/0001-57',
      nomeFantasia: 'Umbrella Corp',
      razaoSocial: 'Umbrella Corp',
    }
  ];
  filteredCompanies: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id') || '0');
    });
    this.initializeForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterCompanies() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCompanies = this.companies.filter(c =>
      c.razaoSocial.toLowerCase().includes(term)
    );
    if (term.length === 0) {
      this.userForm.setValue({ ...this.userForm.value, 'empresa': '' });
      this.filteredCompanies = [];
    }
  }

  selectCompany(company: any) {
    this.searchTerm = company.razaoSocial;
    this.filteredCompanies = [];
    this.userForm.setValue({ ...this.userForm.value, 'empresa': company.razaoSocial });
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      nome: ['123 Milhas', Validators.required],
      login: ['adilton.jr@outlook.com', Validators.required],
      empresa: ['', Validators.required],
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    if (this.userForm.valid) {
      this.empresas.push(this.companies.find(c => c.razaoSocial === this.userForm.value.empresa));
      this.searchTerm = '';
      this.filteredCompanies = [];
      this.userForm.setValue({ ...this.userForm.value, 'empresa': '' });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public headerInformation = {
    pageTitle: 'Usuários',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Usuários', path: '/administracao/users' }
    ],
  };

  
}
