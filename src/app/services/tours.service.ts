import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API } from '../shared/api';
import { ITour, IToursServerRes } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  //type
   private tourTypeSubject = new Subject<any>(); //TODO defined type
   readonly tourType$ = this.tourTypeSubject.asObservable();

  //date
   private tourDateSubject = new Subject<any>();
   readonly tourDate$ = this.tourDateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTours(): Observable<IToursServerRes> { 
    return this.http.get<IToursServerRes>(API.tours);
  }
  getTourById(id:string):Observable<ITour>{
    const tourApi =API.tour;
    const path =API.tour+'/'+id;   // альтернативный способ
    return this.http.get<ITour>(`${tourApi}/${id}`)
  }
  getNearestTourByLocationId(id:string):Observable<ITour[]>{
    return this.http.get<ITour[]> (API.nearestTours,{
      params:{location: id}
    });
  }

  searchTours(tours:ITour[],value:string): ITour[] {
    if (Array.isArray(tours)) {
      return tours.filter((tour)=>{

        if (tour && typeof tour.name === 'string' ){
          return tour.name.toLowerCase().includes(value.toLowerCase());

        }else {
          return false;
        }
      });
    }else {
      return[];
    }
  }
  initChangeTourType (val:any): void {
    this.tourTypeSubject.next(val)
  }
  initChangeTourDate (val:any): void {
    this.tourDateSubject.next(val)
  }
  

}
