import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../../services/services';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = '';
  level: string = 'success';

  constructor(
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books)=> {
        this.bookResponse = books;
      }
    });
  }

  gotoFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  gotoPreviousPage() {
    if (this.bookResponse && this.bookResponse.totalPages !== undefined) {
      this.page = this.bookResponse.totalPages - 1;
    }
    this.findAllBooks();
  }

  gotoPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  gotoNextPage() {
    if (this.bookResponse && this.bookResponse.totalPages !== undefined) {
      this.page = this.bookResponse.totalPages + 1;
    }
    this.findAllBooks();
  }

  gotoLastPage() {
    if (this.bookResponse && this.bookResponse.totalPages !== undefined) {
      this.page = this.bookResponse.totalPages;
    }
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.bookResponse && this.bookResponse.totalPages !== undefined && this.page === this.bookResponse.totalPages;
  }

  onBorrow(book: BookResponse) {
    this.message = "";
    this.level = "success";
    this.bookService.borrowBook({
      "book-id": book.id as number
    }).subscribe({
      next: (response) => {
        this.message = "Book borrowed successfully";
        this.level = "success";
      }, 
      error: (error) => {
        this.message = error.error.error;
        this.level = "error";
      },
      complete: () => {
        setTimeout(() => {
          this.message = "";
        }, 5000);
      }
    });
  }
}
