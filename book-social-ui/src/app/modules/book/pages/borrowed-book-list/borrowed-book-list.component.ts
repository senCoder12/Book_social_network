import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BooksService } from '../../../../services/services';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, EmptyStateComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse = {};
  page: number = 0;
  size: number = 10;
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.bookService.findAllBorrowedBook({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.borrowedBooks = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onPageChange(page: number) {
    this.page = page;
    this.finalBorrowedBooks();
  }

}
