import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent }      from './books/books.component';
import { BookDetailsComponent }      from './book-details/book-details.component';
import { ChaptersComponent }      from './chapters/chapters.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'book-detail/:id', component: BookDetailsComponent },
  { path: 'books/:bookId/chapters/:chapterId', component: ChaptersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
