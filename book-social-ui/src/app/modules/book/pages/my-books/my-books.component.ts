import { Component } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BooksService } from '../../../../services/services';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [ BookCardComponent, CommonModule, FormsModule, RouterLink, PaginationComponent, LoaderComponent, EmptyStateComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent {
  
    bookResponse: PageResponseBookResponse = {};
    page: number = 0;
    size: number = 5;
    isLoading: boolean = false;
  
    constructor(
      private bookService: BooksService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.findAllBooks();
    }
    findAllBooks() {
      this.isLoading = true;
      this.bookService.findAllBooksByOwner({
        page: this.page,
        size: this.size
      }).subscribe({
        next: (books)=> {
          this.bookResponse = books;
          this.isLoading = false;
        }
      });
    }

    archiveBook(book: BookResponse) {
      this.bookService.updateArchivedStatus({
        "book-id": book.id as number
      }).subscribe({
        next: () => {
          book.archived = !book.archived;
        }
      });
    }

    editBook(book: BookResponse) {
      this.router.navigate(['books', 'manage', book.id]);
    }

    shareBook(book: BookResponse) {
      this.bookService.updateShareableStatus({
        "book-id": book.id as number
      }).subscribe({
        next: () => {
          book.shareable = !book.shareable;
        }
      })
    }

    onPageChange(page: number) {
      this.page = page;
      this.findAllBooks();
    }
}
