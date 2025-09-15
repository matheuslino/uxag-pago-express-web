import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AlertConfig, ModalData } from '../../../interface/alert-config-modal.interface';


@Component({
  selector: 'app-alert-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: `./alert-config-modal.component.html`,
  styleUrls: ['./alert-config-modal.component.scss']
})
export class AlertConfigModalComponent implements OnInit {
  alertForm!: FormGroup;
  alertConfigs: AlertConfig[] = [];
  
  // Opções de horário para configuração
  timeOptions = [
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AlertConfigModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  ngOnInit(): void {
    this.initializeAlertConfigs();
    this.buildForm();
  }

  private initializeAlertConfigs(): void {
    // Dados mockados baseados na imagem
    this.alertConfigs = [
      {
        id: 'deposits',
        name: 'Depósitos',
        enabled: true,
        timeConfig: { hour: '', minute: '' }
      }
      // Adicione mais configurações conforme necessário
    ];
  }

  private buildForm(): void {
    const formControls: any = {};
    
    this.alertConfigs.forEach(alert => {
      formControls[`alert_${alert.id}`] = [alert.enabled];
      if (alert.timeConfig) {
        formControls[`time_${alert.id}`] = [alert.timeConfig.hour || ''];
      }
    });

    this.alertForm = this.fb.group(formControls);
  }

  getAlertDescription(alertId: string): string {
    const descriptions: { [key: string]: string } = {
      'deposits': 'Alerta para Cash-in não realizado em minutos.'
    };
    return descriptions[alertId] || '';
  }

  trackByAlertId(index: number, alert: AlertConfig): string {
    return alert.id;
  }

  onSave(): void {
    if (this.alertForm.valid) {
      const formValue = this.alertForm.value;
      const updatedConfigs = this.alertConfigs.map(alert => ({
        ...alert,
        enabled: formValue[`alert_${alert.id}`],
        timeConfig: alert.timeConfig ? {
          ...alert.timeConfig,
          hour: formValue[`time_${alert.id}`] || ''
        } : undefined
      }));

      this.dialogRef.close({
        saved: true,
        alertConfigs: updatedConfigs
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close({ saved: false });
  }
}