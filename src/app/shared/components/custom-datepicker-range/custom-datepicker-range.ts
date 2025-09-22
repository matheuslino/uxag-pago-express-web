import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface DateRange {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-custom-picker-date-range',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerRange),
      multi: true
    }
  ],
  templateUrl: './custom-datepicker-range.html',
  styleUrls: ['./custom-datepicker-range.scss']
})
export class CustomDatePickerRange implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Selecione o período';
  @Input() showPresets: boolean = true;
  @Output() rangeChange = new EventEmitter<DateRange>();

  selectedRange: DateRange = {
    startDate: '',
    endDate: ''
  };

  isOpen = false;
  isFocused = false;
  activePreset: string = '';

  presets = [
    { key: 'hoje', label: 'Hoje' },
    { key: 'semana', label: '7 dias' },
    { key: 'mes', label: '30 dias' },
    { key: 'todos', label: 'Todos' }
  ];

  private onChange = (value: DateRange) => {};
  private onTouched = () => {};

  constructor() {
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (event) => {
      if (!event.target || !(event.target as Element).closest('.date-range-container')) {
        this.isOpen = false;
        this.isFocused = false;
      }
    });
  }

  togglePicker(): void {
    this.isOpen = !this.isOpen;
    this.isFocused = this.isOpen;
  }

  onDateChange(): void {
    this.activePreset = '';
    this.onChange(this.selectedRange);
    this.rangeChange.emit(this.selectedRange);
  }

  selectPreset(preset: string): void {
    this.activePreset = preset;
    const today = new Date();
    
    switch (preset) {
      case 'hoje':
        this.selectedRange = {
          startDate: this.formatDate(today),
          endDate: this.formatDate(today)
        };
        break;
      case 'semana':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        this.selectedRange = {
          startDate: this.formatDate(weekAgo),
          endDate: this.formatDate(today)
        };
        break;
      case 'mes':
        const monthAgo = new Date(today);
        monthAgo.setDate(today.getDate() - 30);
        this.selectedRange = {
          startDate: this.formatDate(monthAgo),
          endDate: this.formatDate(today)
        };
        break;
      case 'todos':
        this.selectedRange = {
          startDate: '',
          endDate: ''
        };
        break;
    }
    
    this.onChange(this.selectedRange);
    this.rangeChange.emit(this.selectedRange);
    this.isOpen = false;
    this.isFocused = false;
  }

  getDisplayText(): string {
    if (!this.selectedRange.startDate && !this.selectedRange.endDate) {
      return this.placeholder;
    }
    
    if (this.selectedRange.startDate === this.selectedRange.endDate) {
      return this.formatDisplayDate(this.selectedRange.startDate);
    }
    
    const start = this.selectedRange.startDate ? this.formatDisplayDate(this.selectedRange.startDate) : '';
    const end = this.selectedRange.endDate ? this.formatDisplayDate(this.selectedRange.endDate) : '';
    
    return `${start} - ${end}`;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatDisplayDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  // ControlValueAccessor implementation
  writeValue(value: DateRange): void {
    if (value) {
      this.selectedRange = { ...value };
    }
  }

  registerOnChange(fn: (value: DateRange) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}