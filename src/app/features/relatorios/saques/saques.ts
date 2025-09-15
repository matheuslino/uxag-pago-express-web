import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saques-relatorio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saques.html',
  styleUrls: ['./saques.scss']
})
export class SaquesRelatorio {
  registros = [
    { data: '10/06/2024', total: 'R$ 9,90' },
    { data: '19/06/2024', total: 'R$ 9,90' }
  ];
}