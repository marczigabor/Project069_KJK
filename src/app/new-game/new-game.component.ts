import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../shared/model/game';
import { KjkApiService } from '../shared/services/kjk-api.service';
import { RandomNumGeneratorService } from '../shared/services/random-num-generator.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  constructor(
    private kjkService: KjkApiService,
    private randomNumGeneratorService :RandomNumGeneratorService,
    private route: ActivatedRoute
    ) { 
      this.game = new Game();
      this.game.bookId = +this.route.snapshot.paramMap.get('bookId');
    }

  game: Game;
  rules: string;

  ngOnInit() {
    this.getRules();
  }

  generate(property: string): void{

    switch(property) { 
      case 'skill': { 
         this.game.skill = this.randomNumGeneratorService.RandomNum(1,12);
         break; 
      } 
      case 'stamina': { 
        this.game.stamina =this.randomNumGeneratorService.RandomNum(14,24);
         break; 
      } 
      case 'luck':{
        this.game.luck = this.randomNumGeneratorService.RandomNum(1,12);
        break; 
      }
      default: { 
        console.error("Wrong property");
         break; 
      } 
   }  
  }

  getRules(): void {
    const id : number = +this.route.snapshot.paramMap.get('bookId');
    console.log('book id: ' + id);
    this.kjkService.getRules(id)
      .subscribe(rules => this.rules = rules);
  }

  submit(): void{
    this.kjkService.addGame(this.game)
      .subscribe(gameId => this.succesfulNewGame(gameId), 
        //error
        (error) => { console.error("Error during saving new game"); }, 
        // completed
        () => {}  );
  }

  succesfulNewGame(gameId: number): void {
    console.log("succesfulNewGame " + gameId);
  }
}
