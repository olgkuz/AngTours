import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, Subject } from 'rxjs';
import { API } from '../shared/api';
import { Coords, IContriesResponseIteam, IFilterTypeLogic, ITour, IToursServerRes } from '../models/tours';

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
    const countries = this.http.get<IContriesResponseIteam[]>(API.countries);
    const tours = this.http.get<IToursServerRes>(API.tours)

    //parralel
    return forkJoin<[IContriesResponseIteam[],IToursServerRes]>([countries,tours]).pipe(

      map((data) => {
        console.log('data',data);

        let toursWithCountries = [] as ITour[];
        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach(country => {
          countriesMap.set(country.iso_code2,country);
        });
        if (Array.isArray(toursArr)) {
          console.log ('***tourArr',toursArr)
          toursWithCountries = toursArr.map((tour)=>{
            return{
              ...tour,
              country: countriesMap.get(tour.code)|| null //add new prop
            }
          });
        }
        return toursWithCountries
      }
    )
    )
    
  }
  getTourById(id:string):Observable<ITour>{
    const tourApi =API.tour;
    const path =API.tour+'/'+id;   // альтернативный способ
    return this.http.get<ITour>(`${tourApi}/${id}`)
  }
  getNearestTourByLocationId(id:string):Observable<ITour[]>{
    return this.http.get<ITour[]> (API.nearestTours,{
      params:{locationId: id}
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
  initChangeTourType (val:IFilterTypeLogic): void {
    this.tourTypeSubject.next(val)
  }
  initChangeTourDate (val:Date): void {
    this.tourDateSubject.next(val)
  }
  
  getCountryByCode(code:string):Observable<any>{
    return this.http.get<Coords[]>(API.countryByCode,{params:{codes:code}}).pipe(
      map((countrieDate)=>{
        console.log('countrieDate',countrieDate);
        const coords = {lat:countrieDate.latlng[0],lng: countrieDate.latlng[1]};
        return this.mapService.getWeather(coords).pipe(
          map((weatherResponce)=>{
            const current = weatherResponce.current;
            const hourly = weatherResponce.hourly;
             const weatherResponce = {
              isDay
             }
          })
        )
      })
    )
  }

}
