import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-custom-select',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelect),  // replace name as appropriate
      multi: true
    }
  ]
})
export class CustomSelect implements ControlValueAccessor, OnInit {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @Input() helpText: string = '';
  @Input() emptyMessage: string = 'Nenhuma opção disponível';
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = false;
  
  @Output() selectionChange = new EventEmitter<SelectOption | null>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  public value: string | number | null = null;
  public isOpen: boolean = false;
  public selectedOption: SelectOption | null = null;
  public highlightedOption: SelectOption | null = null;
  public hasError: boolean = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.updateSelectedOption();
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOption();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Dropdown methods
  toggleDropdown(): void {
    if (this.disabled) return;
    
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    if (this.disabled) return;
    
    this.isOpen = true;
    this.highlightedOption = this.selectedOption;
    this.opened.emit();
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.highlightedOption = null;
    this.onTouched();
    this.closed.emit();
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;
    
    this.value = option.value;
    this.selectedOption = option;
    this.onChange(this.value);
    this.selectionChange.emit(option);
    this.closeDropdown();
  }

  clearSelection(): void {
    if (this.disabled) return;
    
    this.value = null;
    this.selectedOption = null;
    this.onChange(null);
    this.selectionChange.emit(null);
  }

  // Keyboard navigation
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen) {
          this.openDropdown();
        } else if (this.highlightedOption) {
          this.selectOption(this.highlightedOption);
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.openDropdown();
        } else {
          this.highlightNext();
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen) {
          this.highlightPrevious();
        }
        break;
        
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }

  private highlightNext(): void {
    const availableOptions = this.options.filter(opt => !opt.disabled);
    const currentIndex = this.highlightedOption ? 
      availableOptions.indexOf(this.highlightedOption) : -1;
    const nextIndex = currentIndex < availableOptions.length - 1 ? 
      currentIndex + 1 : 0;
    this.highlightedOption = availableOptions[nextIndex];
  }

  private highlightPrevious(): void {
    const availableOptions = this.options.filter(opt => !opt.disabled);
    const currentIndex = this.highlightedOption ? 
      availableOptions.indexOf(this.highlightedOption) : -1;
    const prevIndex = currentIndex > 0 ? 
      currentIndex - 1 : availableOptions.length - 1;
    this.highlightedOption = availableOptions[prevIndex];
  }

  // Utility methods
  private updateSelectedOption(): void {
    this.selectedOption = this.options.find(opt => opt.value === this.value) || null;
  }

  trackByValue(index: number, option: SelectOption): any {
    return option.value;
  }

  // Validation
  setError(hasError: boolean, message?: string): void {
    this.hasError = hasError;
    if (message) {
      this.errorMessage = message;
    }
  }

  // Public API methods
  focus(): void {
    // Focus implementation for programmatic focus
    const trigger = document.querySelector('.custom-select-trigger') as HTMLElement;
    trigger?.focus();
  }

  blur(): void {
    this.closeDropdown();
  }

  reset(): void {
    this.clearSelection();
    this.hasError = false;
    this.errorMessage = '';
  }
}