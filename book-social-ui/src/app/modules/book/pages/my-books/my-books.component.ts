import { Component } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BooksService } from '../../../../services/services';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [ BookCardComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent {
  
    bookResponse: PageResponseBookResponse = {};
    page: number = 0;
    size: number = 5;
  
    constructor(
      private bookService: BooksService
    ) {}
  
    ngOnInit(): void {
      this.findAllBooks();
    }
    findAllBooks() {
      this.bookService.findAllBooksByOwner({
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

    archiveBook(book: BookResponse) {

    }

    editBook(book: BookResponse) {

    }

    shareBook(book: BookResponse) {

    }
}
