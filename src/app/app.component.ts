import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from './shared/model/loggedInUser';
import { KjkApiService } from './shared/services/kjk-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'kjk';
  currentUser: LoggedInUser;
 
  constructor(
    private kjkService: KjkApiService,
    private router: Router   
    ){
    this.kjkService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.kjkService.logout();
    this.router.navigate(['/login']);
  }  
}
