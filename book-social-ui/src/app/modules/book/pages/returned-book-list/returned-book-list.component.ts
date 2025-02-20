import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BooksService } from '../../../../services/services';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returned-book-list',
  standalone: true,
  imports: [ CommonModule, PaginationComponent, EmptyStateComponent ],
  templateUrl: './returned-book-list.component.html',
  styleUrl: './returned-book-list.component.scss'
})
export class ReturnedBookListComponent implements OnInit { 

  returnedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse = {};
  page: number = 0;
  size: number = 10;
  isLoading: boolean = false;

  constructor(
    private bookService: BooksService
  ) { }

  ngOnInit(): void {
    this.findReturnedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse): void {
    this.selectedBook = book;
  }

  private findReturnedBooks(): void {
    this.isLoading = true;
    this.bookService.findAllReturnedBook({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.returnedBooks = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onPageChange(page: number) {
    this.page = page;
    this.findReturnedBooks();
  }
} 
