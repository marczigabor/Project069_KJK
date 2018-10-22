import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KjkApiService {
  getBooks(): any {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
