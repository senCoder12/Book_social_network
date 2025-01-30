import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../../services/services';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

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
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books)=> {
        this.bookResponse = books;
      }
    });
  }

}
