import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RatingComponent, CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _bookCover: string | undefined;
  private _manage: boolean = false;

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(book: BookResponse) {
    this._book = book;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(manage: boolean) {
    this._manage = manage;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64, ' + this._book.cover;
    }
    return this._bookCover;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter();

  editBook(arg0: number|undefined) {
    throw new Error('Method not implemented.');
  }

  deleteBook(arg0: number|undefined) {
    throw new Error('Method not implemented.');
  }

  onShowDetails() {
    this.details.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }
  
  onShare() {
    this.share.emit(this._book);
  }
  
  onEdit() {
    this.edit.emit(this._book);
  }
  
  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }
  
  onBorrow() {
    this.borrow.emit(this._book);
  }

}
