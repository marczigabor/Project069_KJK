import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

import { BooksComponent }      from './books/books.component';
import { BookDetailsComponent }      from './book-details/book-details.component';
import { ChaptersComponent }      from './chapters/chapters.component';
import { NewGameComponent }      from './new-game/new-game.component';
import { GameComponent }      from './game/game.component';
import { GamesComponent } from './games/games.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', canActivate: [AuthGuard]  },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard]  },
  { path: 'book-detail/:id', component: BookDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'books/:bookId/chapters/:chapterId', component: ChaptersComponent, canActivate: [AuthGuard]  },
  { path: 'new-game/:bookId', component: NewGameComponent, canActivate: [AuthGuard]  },
  { path: 'game/:gameId', component: GameComponent, canActivate: [AuthGuard]  },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard]  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
