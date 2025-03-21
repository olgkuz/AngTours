import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authUser(user: IUser):Observable<string> {
    throw new Error('Method not implemented.');
  }

 

  private currentUser: IUser | null = null;

  constructor(private http:HttpClient) {}
  
  registerUser  (user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user,{responseType:'text'});
  }
 

  addUser(user: IUser): Observable<string>{
   return this.http.post<string>(API.auth,user);
  }
  getUser(): IUser {
    return this.currentUser
  }
  setUser (user:IUser): void {
    this.currentUser = user;
  }
}