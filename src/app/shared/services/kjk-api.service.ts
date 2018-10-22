import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from '../model/book';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { BookDetailed } from '../model/bookDetailed';
import { Chapter } from '../model/chapter';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class KjkApiService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }   
    private kjkUrl = 'https://localhost:5001/api/';

  
  getChapter(bookId: number, chapterId: number): Observable<Chapter>  {
    const url = `${this.kjkUrl}books/${bookId}/chapters/${chapterId}`;

    return this.http.get<Chapter>(url)
      .pipe(
        tap(_ => this.log(`fetched chapter bookId=${bookId} chapterId=${chapterId}`)),
        catchError(this.handleError<Chapter>(`getChapter bookId=${bookId} chapterId=${chapterId}`))
      ); 
  }

  getBook(id: number): Observable<BookDetailed> {
    const url = `${this.kjkUrl}books/${id}`;

    return this.http.get<BookDetailed>(url)
      .pipe(
        tap(_ => this.log(`fetched book id=${id}`)),
        catchError(this.handleError<BookDetailed>(`getBook id=${id}`))
      ); 
  }
  
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.kjkUrl + "books")
      .pipe(
        tap(books => this.log('fetched books')),
        catchError(this.handleError('getBooks', []))
      ); 
  }

/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`KJK service: ${message}`);
  }   

}
