import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposito-relatorio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deposito.html',
  styleUrls: ['./deposito.scss']
})
export class DepositoRelatorio {
  registros = [
    { data: '10/06/2024', total: 'R$ 9,90' },
    { data: '19/06/2024', total: 'R$ 9,90' }
  ];
}