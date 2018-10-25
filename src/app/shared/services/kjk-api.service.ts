import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from '../model/book';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { BookDetailed } from '../model/bookDetailed';
import { Chapter } from '../model/chapter';
import { Game } from '../model/game';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class KjkApiService {
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }   
    private kjkUrl = 'https://localhost:5001/api/';
    //private kjkUrl = 'http://localhost:54656/api/';

  getGames(): Observable<Game[]> {
    const url = `${this.kjkUrl}games`;

    return this.http.get<Game[]>(url)
    .pipe(
      tap(x => this.log(`getting games`)),
      catchError(this.handleError<Game[]>('getGames'))
    );
  }    
  
  addGame(game: Game): Observable<number> {
    const url = `${this.kjkUrl}games`;

    return this.http.post<number>(url, game, httpOptions).pipe(
      tap(x => this.log(`added game with id: ${x} `)),
      catchError(this.handleError<number>('addGame'))
    );
  }

  getGame(gameId: number): Observable<Game> {
    const url = `${this.kjkUrl}games/${gameId}`;

    return this.http.get<Game>(url)
      .pipe(
        tap(game => this.log(`fetched game=${game.id}`)),
        catchError(this.handleError<Game>(`getGame gameId=${gameId}`))
      ); 
  }

  getChapter(bookId: number, chapterId: number): Observable<Chapter>  {
    const url = `${this.kjkUrl}books/${bookId}/chapters/${chapterId}`;

    return this.http.get<Chapter>(url)
      .pipe(
        tap(_ => this.log(`fetched chapter bookId=${bookId} chapterId=${chapterId}`)),
        catchError(this.handleError<Chapter>(`getChapter bookId=${bookId} chapterId=${chapterId}`))
      ); 
  }

  getFirstChapter(bookId: number): Observable<Chapter>  {
    const url = `${this.kjkUrl}books/${bookId}/chapters/first`;

    return this.http.get<Chapter>(url)
      .pipe(
        tap(_ => this.log(`fetched chapter bookId=${bookId}`)),
        catchError(this.handleError<Chapter>(`getChapter bookId=${bookId}`))
      ); 
  }

  getRules(bookId: number):Observable<string>{
    const url = `${this.kjkUrl}books/${bookId}/rules`;

    return this.http.get<string>(url)
      .pipe(
       tap(_ => this.log(`fetched rules bookId=${bookId}`)),
       catchError(this.handleError<string>(`getRules bookId=${bookId}`))
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
