import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }
  getTours(): Observable<any> { 
    return this.http.get(API.tours);// добавить описание
  }
  getTourById(id:string):Observable<any>{
    const tourApi= API.tour;
    return this.http.get(`${tourApi}/${id}`)
  }

}
