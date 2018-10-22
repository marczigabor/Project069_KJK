import { Component, OnInit } from '@angular/core';
import { KjkApiService } from '../shared/services/kjk-api.service';
import { Book } from '../shared/model/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private kjkService: KjkApiService) { }
  books: Book[];
  

  ngOnInit() {
    this.getBooks();
  }    
  getBooks(): void {
    this.kjkService.getBooks().subscribe(books => this.books = books);
  }
}
