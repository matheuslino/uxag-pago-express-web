import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterInfo } from '../../../../shared/components/footer-info/footer-info';
import { CommonModule, Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
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
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs implements OnInit, OnDestroy {

  public usuarioId: number | undefined;

  private subscription = new Subscription();

  userForm!: FormGroup;

  usuarioMenu: string = 'usuario';
  nomeUsuarioAtual = '';
  empresaUsuarioAtual = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
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
    });
  }

  get nomeUsuario(): string {
    return this.nomeUsuarioAtual || this.userForm?.get('nome')?.value || '';
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
