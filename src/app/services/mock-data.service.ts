import { Injectable } from '@angular/core';
import { TransferConfig, Company } from '../interface/transfer-config.interface';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  static readonly COMPANIES: Company[] = [
    {
      id: '1',
      nome: 'Empresa',
      milhas: '123 Milhas',
      icon: 'business'
    },
    {
      id: '2',
      nome: 'TAM Linhas Aéreas',
      milhas: '250 Milhas',
      icon: 'flight'
    },
    {
      id: '3',
      nome: 'Gol Linhas Aéreas',
      milhas: '180 Milhas',
      icon: 'flight'
    },
    {
      id: '4',
      nome: 'Azul Linhas Aéreas',
      milhas: '320 Milhas',
      icon: 'flight'
    }
  ];

  static readonly DEFAULT_CONFIG: TransferConfig = {
    id: '1',
    empresa: {
      nome: 'Empresa',
      milhas: '123 Milhas'
    },
    gratis: null,
    limite: null,
    fixo: null,
    taxa: null,
    minimo: null,
    maximo: null
  };
}