import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BooksService } from '../../../../services/services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(
    private bookService: BooksService
  ) { }
  
  ngOnInit(): void {
    this.finalBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse): void {
    this.selectedBook = book;
  }

  private finalBorrowedBooks(): void {
    this.bookService.findAllBorrowedBook({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.borrowedBooks = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  gotoFirstPage() {
    this.page = 0;
    this.finalBorrowedBooks();
  }

  gotoPreviousPage() {
    if (this.borrowedBooks && this.borrowedBooks.totalPages !== undefined) {
      this.page = this.borrowedBooks.totalPages - 1;
    }
    this.finalBorrowedBooks();
  }

  gotoPage(page: number) {
    this.page = page;
    this.finalBorrowedBooks();
  }

  gotoNextPage() {
    this.page = this.page + 1;
    this.finalBorrowedBooks();
  }

  gotoLastPage() {
    if (this.borrowedBooks && this.borrowedBooks.totalPages !== undefined) {
      this.page = this.borrowedBooks.totalPages - 1;
    }
    this.finalBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.borrowedBooks && this.borrowedBooks.totalPages !== undefined && this.page + 1 === this.borrowedBooks.totalPages;
  }

  onPageChange(page: number) {
    this.page = page;
    this.finalBorrowedBooks();
  }

}
