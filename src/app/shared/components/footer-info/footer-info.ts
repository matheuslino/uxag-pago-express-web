import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-info',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './footer-info.html',
  styleUrl: './footer-info.scss'
})
export class FooterInfo {

  @Input() information: string = '';
  @Input() label: string = '';
  @Input() context: string = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit();
  }

}
