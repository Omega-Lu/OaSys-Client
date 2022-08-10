import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/CurrentUser.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  model: any;

  baseUrl = 'https://localhost:7113/api/CurrentUser';

  constructor(private http: HttpClient) {}

  //get all CurrentUsers
  getAllCurrentUsers(): Observable<CurrentUser[]> {
    this.model = this.http.get<CurrentUser[]>(this.baseUrl);
    return this.http.get<CurrentUser[]>(this.baseUrl);
  }

  addCurrentUser(CurrentUser: CurrentUser): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(this.baseUrl, CurrentUser);
  }

  deleteCurrentUser(id: number): Observable<CurrentUser> {
    return this.http.delete<CurrentUser>(this.baseUrl + '/' + id);
  }

  updateCurrentUser(CurrentUser: CurrentUser): Observable<CurrentUser> {
    return this.http.put<CurrentUser>(
      this.baseUrl + '/' + CurrentUser.id,
      CurrentUser
    );
  }
}
