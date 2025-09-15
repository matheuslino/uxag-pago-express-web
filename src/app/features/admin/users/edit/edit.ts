import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { FooterInfo } from '../../../../shared/components/footer-info/footer-info';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';


@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit implements OnInit, OnDestroy {

  public usuarioId: number | undefined;

  userForm!: FormGroup;
  private subscription = new Subscription();
  usuarioMenu: string = 'usuario';
  nomeUsuarioAtual = '';
  empresaUsuarioAtual = '';
  formDataAtual: any = {};

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

  private initializeForm() {
    this.userForm = this.fb.group({
      cnpj: ['26.669.170/0001-57', Validators.required],
      nome: ['123 Milhas', Validators.required],
      phone: ['(00) 0 0000-0000', Validators.required],
      email: ['adilton.jr@outlook.com', Validators.required],
      login: ['adilton.jr@outlook.com', Validators.required],
      empresa: ['3 FACES - 44.195.498/0001-24', Validators.required],
      pais: ['Brasil', Validators.required],
      perfil: ['Usuário', Validators.required]
    });
  }

  // Getters como fallback (mais estáveis agora)
  get nomeUsuario(): string {
    return this.nomeUsuarioAtual || this.userForm?.get('nome')?.value || '';
  }

  get empresaUsuario(): string {
    return this.empresaUsuarioAtual || this.userForm?.get('empresa')?.value || '';
  }

  cancel() {
    this.location.back();
  }

  submit() {
    console.log('📤 Submitting form:', this.formDataAtual);
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