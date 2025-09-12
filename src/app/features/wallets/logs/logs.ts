import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ILogEntry {
  timestamp: string;
  date: string;
  details: {
    title: string;
    origin: string;
  };
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs {

  public logHistory: ILogEntry[] = [
    {
      timestamp: '04h16m17s',
      date: '08/06/2024',
      details: {
        title: 'Credenciais alteradas',
        origin: 'esb.page'
      }
    },
    {
      timestamp: '03h55m02s',
      date: '08/06/2024',
      details: {
        title: 'Login efetuado',
        origin: 'web.app'
      }
    },
    {
      timestamp: '15h30m45s',
      date: '07/06/2024',
      details: {
        title: 'Transferência realizada',
        origin: 'api.service'
      }
    }
  ];

}