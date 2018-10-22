import { Component } from '@angular/core';
import { KjkApiService } from '../app/shared/services/kjk-api.service';
import { Book } from '../app/shared/model/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private kjkService: KjkApiService) { }
  books: Book;
  title = 'kjk';

  getBooks(): void {
    this.books = this.kjkService.getBooks();
  }
}
