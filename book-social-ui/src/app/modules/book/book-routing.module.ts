import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { BorrowedBookListComponent } from './pages/borrowed-book-list/borrowed-book-list.component';
import { authGuard } from '../../services/guard/auth.guard';
import { ReturnedBookListComponent } from './pages/returned-book-list/returned-book-list.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: BookListComponent,
        title: "Books",
        canActivate: [authGuard],
      },
      {
        path: "my-books",
        component: MyBooksComponent,
        title: "My Books",
        canActivate: [authGuard],
      },
      {
        path: "manage",
        component: ManageBookComponent,
        title: "Add a new Book",
        canActivate: [authGuard]
      },
      {
        path: "manage/:bookId",
        component: ManageBookComponent,
        canActivate: [authGuard],
        title: "Manage Book"
      },
      {
        path: "borrowed-books",
        component: BorrowedBookListComponent,
        canActivate: [authGuard],
        title: "Borrowed Books"
      },
      {
        path: "returned-books",
        component: ReturnedBookListComponent,
        canActivate: [authGuard],
        title: "Returned Books"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
