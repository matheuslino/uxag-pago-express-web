import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-new-item-wallet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './new-item-wallet.html',
  styleUrl: './new-item-wallet.scss'
})
export class NewItemWallet {

  public formData = {
    carteira: '',
    tipo: 'Crédito',
    valor: null as number | null,
    observacao: ''
  };

  saveItem(): void {
    if(!this.formData.valor || !this.formData.carteira) {
      alert('Por favor, preencha os campos Carteira e Valor.');
      return;
    }
    console.log('Salvando item:', this.formData);
    alert('Item salvo com sucesso!');
    this.formData = {
      carteira: '',
      tipo: 'Crédito',
      valor: null,
      observacao: ''
    };
  }
}