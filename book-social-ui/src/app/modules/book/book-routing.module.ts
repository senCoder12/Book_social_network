import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { BorrowedBookListComponent } from './pages/borrowed-book-list/borrowed-book-list.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: BookListComponent,
        title: "Books"
      },
      {
        path: "my-books",
        component: MyBooksComponent,
        title: "My Books"
      },
      {
        path: "manage",
        component: ManageBookComponent,
        title: "Add a new Book"
      },
      {
        path: "manage/:bookId",
        component: ManageBookComponent,
        title: "Manage Book"
      },
      {
        path: "borrowed-books",
        component: BorrowedBookListComponent,
        title: "Borrowed Books"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
