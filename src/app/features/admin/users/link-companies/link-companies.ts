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

  userForm!: FormGroup;

  usuarioMenu: string = 'usuario';
  nomeUsuarioAtual = '';
  empresaUsuarioAtual = '';
  searchTerm = '';
  companies = ['Stark Mobilias', 'Wayne Enterprises', 'Oscorp', 'Umbrella Corp'];
  filteredCompanies: string[] = [];

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
      c.toLowerCase().includes(term)
    );
  }

  selectCompany(company: string) {
    this.searchTerm = company;
    this.filteredCompanies = [];
    this.userForm.setValue({ 'empresa': company });
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      nome: ['123 Milhas', Validators.required],
      login: ['adilton.jr@outlook.com', Validators.required],
      empresa: ['3 FACES - 44.195.498/0001-24', Validators.required],
      clientId: ['', Validators.required],
      clientSecret: ['', Validators.required],
    });
  }

  get nomeUsuario(): string {
    return this.nomeUsuarioAtual || this.userForm?.get('nome')?.value || '';
  }

  cancel() {
    this.location.back();
  }

  submit() {
    if (this.userForm.valid) {
      alert('Form enviado com sucesso!\n' + JSON.stringify(this.userForm.value));
    } else {
      alert('Form inválido');
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
