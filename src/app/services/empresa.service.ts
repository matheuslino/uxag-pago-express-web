import { Injectable } from '@angular/core';

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
export class EmpresaService {

  private empresas: Empresa[] = [
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

  getEmpresas(): Empresa[] {
    return this.empresas;
  }

  getEmpresaById(id: number): Empresa | undefined {
    return this.empresas.find(e => e.id === id);
  }
}
