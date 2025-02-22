import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BooksService, FeedbackService } from '../../../../services/services';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from "../../components/rating/rating.component";

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, EmptyStateComponent, FormsModule, RatingComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse | undefined = undefined;
  feedBackRequest: FeedbackRequest = {
    comment: '',
    bookId: 0,
    note: 0
  };
  page: number = 0;
  size: number = 10;
  isLoading: boolean = false;

  constructor(
    private bookService: BooksService,
    private feedbackService: FeedbackService
  ) { }
  
  ngOnInit(): void {
    this.finalBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse): void {
    this.selectedBook = book;
    this.feedBackRequest.bookId = book.id as number;
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

  returnBook(withFeedback: boolean): void {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number,
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.finalBorrowedBooks();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  giveFeedback(): void {
    this.feedbackService.saveFeedback1({
      body: this.feedBackRequest
    }).subscribe({
      next: () => {}
    })
  }

}
