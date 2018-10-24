import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KjkApiService } from '../shared/services/kjk-api.service';
import { Chapter } from '../shared/model/chapter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnChanges {

  @Input() bookId: number;
  @Input() chapterId: number;
  
  // private _chapterId: number;
  // @Input()
  // set chapterId(value: number) {
  //   this._chapterId = value;
  // }
 
  // get chapterId(): number { return this._chapterId; }


  chapter: Chapter;  

  constructor(
    private kjkService: KjkApiService,
    private route: ActivatedRoute
    ) {
      route.params.subscribe(val => {
        this.getChapter();
        console.log("loaded chapter");
      });
     }

  ngOnChanges(changes: SimpleChanges): void {
  
    if ((changes.bookId.previousValue !== changes.bookId.currentValue) || (changes.chapterId.previousValue !== changes.chapterId.currentValue))
    {
      this.getChapter();
      console.log(changes.bookId);
      }
  }

  setChapterId(chapterId: number):void{
    this.chapterId = chapterId;
    this.getChapter();
  }

  getChapter(): void {

    if(this.bookId && this.chapterId){
      let chapterObservable : Observable<Chapter>; 

      if (this.chapterId == 1){
        chapterObservable = this.kjkService.getFirstChapter(this.bookId);
        
      }else {
        chapterObservable = this.kjkService.getChapter(this.bookId, this.chapterId);
      }

      chapterObservable.subscribe(chapter => this.chapter = chapter);
    }
  }
}
