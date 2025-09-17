import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-custom-checkbox',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './custom-checkbox.html',
  styleUrl: './custom-checkbox.scss'
})
export class CustomCheckbox {

  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

}
