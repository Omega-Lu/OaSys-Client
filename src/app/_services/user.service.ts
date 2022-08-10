import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  model: any;

  baseUrl = 'https://localhost:7113/api/User';

  constructor(private http: HttpClient) {}

  //get all users
  getAllUsers(): Observable<User[]> {
    this.model = this.http.get<User[]>(this.baseUrl);
    return this.http.get<User[]>(this.baseUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.baseUrl + '/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/' + user.useR_ID, user);
  }
}
