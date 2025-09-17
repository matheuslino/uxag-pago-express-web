// wallet.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Empresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  numeroCarteira: string;
  apelido: string;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private empresasSubject = new BehaviorSubject<Empresa[]>([]);
  public empresas$ = this.empresasSubject.asObservable();

  private mockData: Empresa[] = [
    {
      id: 1,
      razaoSocial: 'FASTCOMMERCE',
      cnpj: '34.192.109/0001-23',
      numeroCarteira: '5131',
      apelido: 'Primeira carteira'
    },
    {
      id: 2,
      razaoSocial: 'Smart Fit',
      cnpj: '34.192.109/0001-23',
      numeroCarteira: '0123',
      apelido: 'Segunda carteira'
    }
  ];

  /**
   * Busca todas as empresas
   * Simula delay de API para teste
   */
  public getEmpresas(): Observable<Empresa[]> {
    return of([...this.mockData]).pipe(delay(100));
  }

  /**
   * Busca empresa por ID
   */
  public getEmpresaById(id: number): Observable<Empresa | undefined> {
    const empresa = this.mockData.find(e => e.id === id);
    return of(empresa).pipe(delay(100));
  }

  /**
   * Atualiza lista de empresas no subject
   */
  public atualizarEmpresas(): void {
    this.empresasSubject.next([...this.mockData]);
  }
}