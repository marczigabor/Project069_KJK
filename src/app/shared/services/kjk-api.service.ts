import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from '../model/book';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { BookDetailed } from '../model/bookDetailed';
import { Chapter } from '../model/chapter';
import { Game } from '../model/game';
import { LoggedInUser } from '../model/loggedInUser';


@Injectable({
  providedIn: 'root'
})
export class KjkApiService {

  private currentUserSubject: BehaviorSubject<LoggedInUser>;
  public currentUser: Observable<LoggedInUser>;  
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
      this.currentUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(localStorage.getItem('jwtToken')));
      this.currentUser = this.currentUserSubject.asObservable();
    }   

    private kjkUrl = 'https://kjk1.azurewebsites.net/api/';
    //private kjkUrl = 'https://localhost:5001/api/';
  //private kjkUrl = 'http://localhost:54656/api/';

  public get currentUserValue(): LoggedInUser {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }  

  login(userName: string, password: string): Observable<string> {
      
    const url = `${this.kjkUrl}auth/login`;
      let body = JSON.stringify({ userName, password });
 
      return this.http.post<any>(url, body).pipe(
        tap(jwtToken => {
          this.setLoginUser(jwtToken);
          })
        //,catchError(this.handleError('Err')
        );
  }

  private setLoginUser(jwtToken: any){
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
    let user: LoggedInUser = new LoggedInUser(jwtToken.id, jwtToken.auth_token, jwtToken.expires_in, jwtToken.userName);
    this.currentUserSubject.next(user);
  }

  refreshToken(): Observable<boolean> {
      if (this.currentUserValue && this.currentUserValue.auth_token){
        
        const url = `${this.kjkUrl}auth/refresh`;
        const token = this.currentUserValue.auth_token;
        let body = JSON.stringify({ token });

        return this.http.post<any>(url, body).pipe(
          tap(jwtToken => {
            this.setLoginUser(jwtToken);
            }),
            map((token)=> { 
              if (token.userName && token.auth_token){
                return true;
              }else{
                return false;
              }
            })
          );      
        }
  }
  
  register(email: string, userName: string, password: string, firstName: string, lastName: string): Observable<any> {
    const url = `${this.kjkUrl}accounts`;

      let body = JSON.stringify({ email, userName, password, firstName, lastName });
 
      return this.http.post<any>(url, body);
      // .pipe(
      //   catchError(this.handleError<any>('register error'))
      // );    
  }

  setGame(game: Game): Observable<Game> {
    const url = `${this.kjkUrl}games`;

    return this.http.put<Game>(url, game).pipe(
      tap(game => this.log(`modified game with id: ${game.id} `)),
      catchError(this.handleError<Game>('setGame'))
    );
  }

  deleteGame(gameId: number): Observable<void> {
    const url = `${this.kjkUrl}games/${gameId}`;

    return this.http.delete<void>(url)
    .pipe(
      tap(x => this.log(`delete game`)),
      catchError(this.handleError<void>('deleteGame'))
    );
  }

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

    return this.http.post<number>(url, game).pipe(
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
