import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number = 0; // Total number of items (e.g., borrowedBooks.length)
  @Input() currentPage: number = 0; // The current page
  @Input() itemsPerPage: number = 10; // Items per page
  @Input() totalPages: number = 0; // Total number of pages (calculated based on totalItems and itemsPerPage)
  
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); // Event to emit page change

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }

  gotoFirstPage() {
    if (!this.isFirstPage) {
      this.currentPage = 0;
      this.emitPageChange();
    }
  }

  gotoPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  gotoPage(pageIndex: number) {
    if (pageIndex >= 0 && pageIndex < this.totalPages) {
      this.currentPage = pageIndex;
      this.emitPageChange();
    }
  }

  gotoNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  gotoLastPage() {
    if (!this.isLastPage) {
      this.currentPage = this.totalPages - 1;
      this.emitPageChange();
    }
  }

  emitPageChange() {
    this.pageChange.emit(this.currentPage);
  }
}
