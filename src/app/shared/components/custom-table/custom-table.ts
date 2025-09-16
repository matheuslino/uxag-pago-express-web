import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export interface TableColumn {
  field: string;
  field2?: string;
  field2Type?: string;
  header: string;
  sortable?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-custom-table',
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
  templateUrl: './custom-table.html',
  styleUrls: ['./custom-table.scss']
})
export class CustomTable {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() isCheckable: boolean = false;
  
  @Output() rowSelected = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<{ column: string; direction: 'asc' | 'desc' | null } | null>();

  selectedRows = new Set<any>();
  currentSort: { column: string; direction: 'asc' | 'desc' | null } | null = null;

  toggleSort(column: TableColumn) {
    if (!column.sortable) return;
    if (!this.currentSort || this.currentSort.column !== column.field) {
      this.currentSort = { column: column.field, direction: 'asc' };
    } else if (this.currentSort.direction === 'asc') {
      this.currentSort = { column: column.field, direction: 'desc' };
    } else {
      this.currentSort = null;
    }
    this.sortChanged.emit(this.currentSort);
  }

  getSortDirection(column: string): 'asc' | 'desc' | null {
    return this.currentSort?.column === column ? this.currentSort.direction : null;
  }

  toggleRow(row: any) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.rowSelected.emit(Array.from(this.selectedRows));
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
        this.data.forEach(row => this.selectedRows.add(row));
    } else {
        this.selectedRows.clear();
    }
  }
}
