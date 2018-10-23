import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KjkApiService } from '../shared/services/kjk-api.service';
import { Chapter } from '../shared/model/chapter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

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

  ngOnInit() {
  }

  getChapter(): void {
    const bookId : number = +this.route.snapshot.paramMap.get('bookId');
    const chapterId : number = +this.route.snapshot.paramMap.get('chapterId');
    let chapterObservable : Observable<Chapter>; 

    if (chapterId == 1){
      chapterObservable = this.kjkService.getFirstChapter(bookId);
      
    }else {
      chapterObservable = this.kjkService.getChapter(bookId, chapterId);
    }

    chapterObservable.subscribe(chapter => this.chapter = chapter);
  }
}
