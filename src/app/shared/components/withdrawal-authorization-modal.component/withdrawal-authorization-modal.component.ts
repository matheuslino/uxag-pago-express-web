import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface WithdrawalAuthorizationData {
  solicitante: string;
  chave: string;
  valor: string;
}

@Component({
  selector: 'app-withdrawal-authorization-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './withdrawal-authorization-modal.component.html',
  styleUrls: ['./withdrawal-authorization-modal.component.scss']
})
export class WithdrawalAuthorizationModalComponent {
  constructor(
    private dialogRef: MatDialogRef<WithdrawalAuthorizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WithdrawalAuthorizationData
  ) {}

  onCancel(): void {
    this.dialogRef.close({ approved: false });
  }

  onApprove(): void {
    this.dialogRef.close({ approved: true });
  }
}
