import { Component } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../../services/services';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {

  constructor(
    private router: Router,
    private bookService: BooksService
  ) {}

  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
    sharable: false
  };
  errorMsg: Array<string> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined;
  loading: boolean = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedBookCover = input.files[0];
    }
    if(this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedPicture = e.target.result;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (res) => {
        if(this.selectedBookCover) {
          this.bookService.uploadBookCover({
            'book-id': res,
            body: {
              file: this.selectedBookCover
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['/books/my-books']);
            }
          });
        } else {
          this.router.navigate(['/books/my-books']);
        }
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
        this.loading = false
    }});
  }

  cancel() {
    this.router.navigate(['/books/my-books']);
  }

}
