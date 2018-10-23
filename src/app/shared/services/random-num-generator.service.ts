import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumGeneratorService {

  constructor() { }

  RandomNum(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
}
