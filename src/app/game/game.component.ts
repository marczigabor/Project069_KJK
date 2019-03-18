import { Component, OnInit, AfterViewInit } from '@angular/core';
import { KjkApiService } from '../shared/services/kjk-api.service';
import { Game } from '../shared/model/game';
import { ActivatedRoute } from '@angular/router';
import { RandomNumGeneratorService } from '../shared/services/random-num-generator.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit  {

  game: Game;
  dices: number[];

  constructor(
    private kjkService: KjkApiService,
    private route: ActivatedRoute,
    private randomNum: RandomNumGeneratorService
  ) { 
    this.dices = [];
  }

  ngOnInit() {
  }

  roll(): void{
    for (let i = 0; i < this.dices.length; i++) { 
      this.dices[i] = this.randomNum.RandomNum(1,6);
    }
  }

  addDice(): void{
    this.dices.push(0);
  }

  removeDice(): void{
    this.dices.pop();
  }

  isRollEnabled(): boolean {
    return this.dices.length<1;
  }

  ngAfterViewInit(): void {
    const gameId : number = +this.route.snapshot.paramMap.get('gameId');
    this.getGame(gameId);
  }  

  getGame(gameId: number): void{
      
    this.kjkService.getGame(gameId)
      .subscribe(game => this.succesfulGetGame(game), 
        //error
        (error) => { console.error(`Error during getting game: ${gameId}`); }, 
        // completed
        () => {}  
    );
  }

  setGame(chapterId: number) {
    //save the latest chapterId

    let gameSave : Game = this.game;
    gameSave.chapterId = chapterId;

    this.kjkService.setGame(this.game)
    .subscribe(game => this.succesfulGetGame(game), 
      //error
      (error) => { console.error("Error during saving new game"); }, 
      // completed
      () => {}  
      );    
  }  

  succesfulGetGame(game: Game): void {
    this.game = game;
  }
}
