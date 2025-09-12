import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-pix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './send-pix.html',
  styleUrl: './send-pix.scss'
})
export class SendPix {

  public showAccountData = true;

  public accountData = {
    name: 'PixPay LTDA',
    key: 'testepix@celcoin.com.br',
    cnpj: '44.190.808/0001-54',
    keyType: 'E-MAIL',
    provider: 'Celcoin'
  };

}