import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {

  public razaoSocial: string = '123 Milhas';
  public apelido: string = 'Default';
  public numeroCarteira: string = '11897';
  public valor: string = '0,00';

}