import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface ILinkedUser {
  cpfCnpj: string;
  name: string;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './config.html',
  styleUrl: './config.scss'
})
export class Config {

  public newUserInput: string = '';

  public linkedUsers: ILinkedUser[] = [
    { cpfCnpj: '552.166.194-88', name: 'admin@123milhas' },
    { cpfCnpj: '069.234.956-10', name: 'admin@123milhas' },
    { cpfCnpj: '457.443.757-08', name: 'admin@123milhas' },
  ];

  addUser(): void {
    if (!this.newUserInput.trim()) {
      return;
    }
    
    const newUser: ILinkedUser = {
      cpfCnpj: this.newUserInput,
      name: 'novo.admin@123milhas' 
    };

    this.linkedUsers.push(newUser);
    this.newUserInput = '';
  }

  removeUser(index: number): void {
    this.linkedUsers.splice(index, 1);
  }
}