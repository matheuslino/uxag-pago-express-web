import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { PasswordChangeRequest, PasswordChangeResponse, User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Dados mockados do usuário atual
  private mockUser: User = {
    id: '1',
    name: 'Adeilton Alves Junior',
    email: 'adeilton.silva@gmail.com',
    phone: '11982302931',
    identification: '82912012644',
    avatar: undefined
  };

  // Simula diferentes cenários de resposta
  private mockResponses: PasswordChangeResponse[] = [
    { success: true, message: 'Senha alterada com sucesso!' },
    { success: false, message: 'Senha atual incorreta' },
    { success: false, message: 'Nova senha não atende aos critérios de segurança' }
  ];

  getCurrentUser(): Observable<User> {
    // Simula delay de rede
    return of(this.mockUser).pipe(delay(100));
  }

  changePassword(passwordData: PasswordChangeRequest): Observable<PasswordChangeResponse> {
    // Simula delay de rede
    return of(this.mockResponses[0]).pipe(delay(100));
    
     }

  // Método para alterar dados mockados durante desenvolvimento
  updateMockUser(user: Partial<User>): void {
    this.mockUser = { ...this.mockUser, ...user };
  }

  // Método para simular diferentes cenários de resposta
  setMockResponse(responseIndex: number): void {
    if (responseIndex >= 0 && responseIndex < this.mockResponses.length) {
      // Pode ser usado para testar diferentes cenários
      console.log(`Mock response set to: ${this.mockResponses[responseIndex].message}`);
    }
  }
}