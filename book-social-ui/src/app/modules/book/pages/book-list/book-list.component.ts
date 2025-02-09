import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../../services/services';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent, PaginationComponent, LoaderComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = '';
  level: string = 'success';
  isLoading: boolean = false;

  constructor(
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.isLoading = true;
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books)=> {
        this.isLoading = false;
        this.bookResponse = books;
      }
    });
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

  onPageChange(page: number) {
    this.page = page;
    this.findAllBooks();
  }
}
