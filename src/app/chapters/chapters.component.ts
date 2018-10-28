import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output  } from '@angular/core';
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
  @Output() chapterChange = new EventEmitter<number>();

  chapter: Chapter;  

  constructor(
    private kjkService: KjkApiService,
    private route: ActivatedRoute
    ) {
      // route.params.subscribe(val => {
      //   this.getChapter();
      //   console.log("loaded chapter");
      // });
     }

  ngOnChanges(changes: SimpleChanges): void {
  
    if ((changes.bookId && changes.bookId.previousValue !== changes.bookId.currentValue) || (changes.chapterId && changes.chapterId.previousValue !== changes.chapterId.currentValue))
    {
      this.getChapter();
      console.log(changes.bookId);
      }
  }

  setChapterId(chapterId: number):void{
    this.chapterChange.emit(chapterId);
  }

  getChapter(): void {
    if (this.bookId && this.chapterId) {
      this.kjkService.getChapter(this.bookId, this.chapterId)
      .subscribe(chapter => this.chapter = chapter);
    }
  }
}
