import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 

  private currentUser: IUser | null = null;

  constructor(private http:HttpClient) {}
  
  registerUser  (user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user,{responseType:'text'});
  }
 

  authUser(user: IUser): Observable<string>{
   return this.http.post<string>(API.auth,user);
  }

  getUser(): IUser {
  
    if (!this.currentUser) {
      const sessionUser: IUser =
      JSON.parse(sessionStorage.getItem('AngularTourUser'));
    if(sessionUser) {
       this.currentUser = sessionUser
    }else {
      return null
   }
    }
    return this.currentUser
  }
  setUser (user:IUser): void {
    this.currentUser = user;
    sessionStorage.setItem('AngularTourUser',JSON.stringify(user))
  }
}