import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { JsonInterceptor } from './shared/interceptor/json.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    BooksComponent,
    BookDetailsComponent,
    ChaptersComponent,
    NewGameComponent,
    GameComponent,
    GamesComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
