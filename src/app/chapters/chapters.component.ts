import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KjkApiService } from '../shared/services/kjk-api.service';
import { Chapter } from '../shared/model/chapter';

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
    const bookId = +this.route.snapshot.paramMap.get('bookId');
    const chapterId = +this.route.snapshot.paramMap.get('chapterId');

    this.kjkService.getChapter(bookId, chapterId)
      .subscribe(chapter => this.chapter = chapter);
  }

}
