import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-new',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './new.html',
  styleUrl: './new.scss'
})
export class New {

  public razaoSocial: string = ''; 
  public apelido: string = '';

}