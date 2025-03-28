import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';
import { ITour, IToursServerRes } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  [x: string]: any;

  constructor(private http: HttpClient) { }
  getTours(): Observable<IToursServerRes> { 
    return this.http.get<IToursServerRes>(API.tours);
  }
  getTourById(id:string):Observable<ITour>{
    const tourApi =API.tour;
    
    return this.http.get<ITour>(`${tourApi}/${id}`)
  }
  getNearestTourByLocationId(id:string):Observable<ITour[]>{
    return this.http.get<ITour[]> (API.nearestTours,{
      params:{location:id}
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

}
