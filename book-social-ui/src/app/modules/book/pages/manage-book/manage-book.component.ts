import { Component, OnInit } from '@angular/core';
import { BookRequest, BookResponse } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../../services/services';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {

  constructor(
    private router: Router,
    private bookService: BooksService,
    private activatedRoute: ActivatedRoute
  ) { }

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
  editPage: boolean = false;

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    if (bookId) {
      this.editPage = true;
      this.bookService.findBookById({
        'book-id': Number(bookId)
      }).subscribe({
        next: (res: BookResponse) => {
          this.bookRequest = {
            id: res.id as number,
            authorName: res.authorName as string,
            isbn: res.isbn as string,
            synopsis: res.synopsis as string,
            title: res.title as string,
            sharable: res.shareable as boolean
          }
          if (res.cover) {
            this.selectedPicture = "data:image/jpeg;base64," + res.cover;
            const byteString = atob(res.cover[0] as string);
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
              intArray[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([intArray], { type: 'image/jpeg' });
            this.selectedBookCover = new File([blob], 'cover.jpg', { type: 'image/jpeg' });
          }
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedBookCover = input.files[0];
    }
    if (this.selectedBookCover) {
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
        if (this.selectedBookCover) {
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
      }
    });
  }

  cancel() {
    this.router.navigate(['/books/my-books']);
  }

}
