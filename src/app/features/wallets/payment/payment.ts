import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IPayment {
  beneficiario: {
    id: string;
    code: string;
  };
  pagador: {
    id: string;
    wallet: string;
  };
  vencimento: string;
  valentia: string | null;
  status: string;
  dadosPagamento: string;
  valorPago: number;
}

type FilterKeys = keyof typeof Payment.prototype.filterCriteria;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class Payment {

  public isFilterPopupVisible = false;
  public searchTerm: string = '';
  public filterCriteria = {
    cliente: '',
    criterio: '',
    dataInicio: '',
    dataFim: '',
    estado: ''
  };
  public activeFilters: { key: FilterKeys, value: string }[] = [];

  private allPayments: IPayment[] = [];
  public filteredPayments: IPayment[] = [];
  public paginatedPayments: IPayment[] = [];
  
  public currentPage = 1;
  public itemsPerPage = 3; 
  public totalPages = 0;
  
  constructor() {
    this.generateMockData();
    this.applyFilters();
  }

  private generateMockData(): void {
    this.allPayments = Array.from({ length: 25 }, (_, i) => ({
      beneficiario: {
        id: `8310000${37 + i}`,
        code: `3cjl8123p103012-${3 + i}`
      },
      pagador: {
        id: `${1132 + i}`,
        wallet: i % 2 === 0 ? 'Default' : 'Secundária'
      },
      vencimento: 'Criada',
      valentia: null,
      status: `R$ ${30 + i},00`,
      dadosPagamento: i % 3 === 0 ? 'Bradesco' : 'Itaú',
      valorPago: 32 + i
    }));
  }

  applyFilters(): void {
    let tempPayments = [...this.allPayments];

    if (this.searchTerm) {
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      tempPayments = tempPayments.filter(p => 
        p.beneficiario.id.toLowerCase().includes(lowerCaseSearch) ||
        p.pagador.id.toLowerCase().includes(lowerCaseSearch) ||
        p.pagador.wallet.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    if (this.filterCriteria.cliente) {
        const lowerCaseCliente = this.filterCriteria.cliente.toLowerCase();
        tempPayments = tempPayments.filter(p => p.beneficiario.id.toLowerCase().includes(lowerCaseCliente));
    }
     if (this.filterCriteria.criterio) {
        const lowerCaseCriterio = this.filterCriteria.criterio.toLowerCase();
        tempPayments = tempPayments.filter(p => p.pagador.wallet.toLowerCase().includes(lowerCaseCriterio));
    }

    this.filteredPayments = tempPayments;
    this.updateActiveFilters();
    this.goToPage(1);
  }


  updateActiveFilters(): void {
    this.activeFilters = [];
    (Object.keys(this.filterCriteria) as FilterKeys[]).forEach(key => {
        if (this.filterCriteria[key]) {
            this.activeFilters.push({ key, value: this.filterCriteria[key] });
        }
    });
  }


  removeFilter(key: FilterKeys): void {
      this.filterCriteria[key] = '';
      this.applyFilters();
  }


  toggleFilterPopup(): void {
    this.isFilterPopupVisible = !this.isFilterPopupVisible;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isFilterPopupVisible && !target.closest('.filters-container')) {
      this.isFilterPopupVisible = false;
      this.applyFilters();
    }
  }


  goToPage(page: number): void {
    this.totalPages = Math.ceil(this.filteredPayments.length / this.itemsPerPage);
    if (page < 1 || (page > this.totalPages && this.totalPages > 0)) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPayments = this.filteredPayments.slice(startIndex, endIndex);
  }


  get paginationNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (this.currentPage > 3) pages.push('...');
      
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (this.currentPage < this.totalPages - 2) pages.push('...');
      pages.push(this.totalPages);
    }
    return pages;
  }
}