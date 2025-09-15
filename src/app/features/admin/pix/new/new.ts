import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AdminSidebar } from '../../../../shared/components/admin-sidebar/admin-sidebar';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterInfo } from '../../../../shared/components/footer-info/footer-info';

@Component({
  selector: 'app-new',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FooterInfo,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
  ],
  templateUrl: './new.html',
  styleUrl: './new.scss'
})
export class New implements OnInit {
  pixForm!: FormGroup;

  empresa = {
    id: '1132',
    nome: 'Barbearia Orizon',
    cliente: '123 Milhas',
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.pixForm = this.fb.group({
      nome: ['Pix principal', Validators.required],
      tipo: ['E-mail', Validators.required],
      chave: ['', Validators.required]
    });
  }

  cancel() {
    console.log('cancel');
    this.location.back()
  }

  submit() {
    if (this.pixForm.valid) {
      console.log('🚀 Dados enviados:', this.pixForm.value);
      alert('Form enviado com sucesso!\n' + JSON.stringify(this.pixForm.value));
    } else {
      alert('❌ Form inválido');
      this.pixForm.markAllAsTouched();
    }
  }

  public headerInformation = {
    pageTitle: 'Chaves PIX',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Chaves PIX', path: '/administracao/pix/new' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova chave',
      disabled: true,
      onClick: () => {
      }
    }
  }

}
