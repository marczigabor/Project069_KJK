import { Component, OnInit } from '@angular/core';
import { KjkApiService } from '../shared/services/kjk-api.service';
import { Game } from '../shared/model/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor(
    private kjkService: KjkApiService
  ) { }

  ngOnInit() {
    this.getGames();
  }

  deleteGame(id: number): void {
    this.kjkService.deleteGame(id)
    .subscribe(
      () => { 
        this.getGames();
        console.log("game deleted") 
      }, 
      //error
      (error) => { console.error(`Error during getting games`); }, 
      // completed
      () => {}  
    );
  }

  getGames():void {
    this.kjkService.getGames()
    .subscribe((games => this.games = games), 
      //error
      (error) => { console.error(`Error during getting games`); }, 
      // completed
      () => {}  
    );
  }
}
