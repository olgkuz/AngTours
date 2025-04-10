import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>();
  loader$ = this.loaderSubject.asObservable();
  constructor() { }

  setLoader(val:boolean):void {
    this.loaderSubject.next(val);
  }

}
