import { Component, OnInit } from '@angular/core';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ProfileSidebarComponent } from '../../../shared/components/profile-sidebar/profile-sidebar';
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
export class MyData implements OnInit {

  public headerInformation = {
    pageTitle: 'Perfil',
    pageSubtitle: 'Acompanhe os dados do seu perfil',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Transacões', path: '/transacoes' },
      { label: 'Pagamento', path: '/transacoes/payment' }
    ],
  };

  public sendLabel: string = 'Entrar em modo de edição';
  public footerInformation: string = '#1132';
  public footerContext: string = 'Dados do usuário:';
  public footerLabel: string = 'Adeilton Alves Junior';

  public isEditing: boolean = false;
  public userForm!: FormGroup; 

  private user = {
    name: 'Lucas Aba Cliente',
    cpf: '829.***.120-**',
    phone: '(11) 98230-2931',
    email: 'adeilton.silva@gmail.com'
  };

  constructor(
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.user.name],
      cpf: [this.user.cpf],
      phone: [this.user.phone],
      email: [this.user.email]
    });

    this.userForm.disable();
  }

  onCancel(): void {
    if (this.isEditing) {
      this.isEditing = false;
      this.sendLabel = 'Entrar em modo de edição';
      this.userForm.reset(this.user);
      this.userForm.disable();
    } else {
      this.location.back();
    }
  }

  onSubmit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.sendLabel = 'Salvar';
      this.userForm.enable();
    } else {
      console.log('Dados salvos:', this.userForm.value);
      this.sendLabel = 'Entrar em modo de edição';
      this.userForm.disable();
      this.user = this.userForm.value;
    }
  }
}