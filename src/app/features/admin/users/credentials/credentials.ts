import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FooterInfo } from '../../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-credentials',
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
  templateUrl: './credentials.html',
  styleUrl: './credentials.scss'
})
export class Credentials implements OnInit, OnDestroy {

  public usuarioId: number | undefined;

  private subscription = new Subscription();

  userForm!: FormGroup;

  usuarioMenu: string = 'usuario';
  nomeUsuarioAtual = '';
  empresaUsuarioAtual = '';

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
      { label: 'Usuários', path: '/administracao/users/credentials' }
    ],
  }

}
