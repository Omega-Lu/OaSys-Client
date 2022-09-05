import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogoutTimer } from '../models/LogoutTimer.model';

@Injectable({
  providedIn: 'root',
})
export class LogoutTimerService {
  model: any;

  baseUrl = 'https://localhost:7113/api/LogoutTimer';

  constructor(private http: HttpClient) {}

  //get all LogoutTimers
  getAllLogoutTimers(): Observable<LogoutTimer[]> {
    this.model = this.http.get<LogoutTimer[]>(this.baseUrl);
    return this.http.get<LogoutTimer[]>(this.baseUrl);
  }

  addLogoutTimer(LogoutTimer: LogoutTimer): Observable<LogoutTimer> {
    return this.http.post<LogoutTimer>(this.baseUrl, LogoutTimer);
  }

  deleteLogoutTimer(id: number): Observable<LogoutTimer> {
    return this.http.delete<LogoutTimer>(this.baseUrl + '/' + id);
  }

  updateLogoutTimer(LogoutTimer: LogoutTimer): Observable<LogoutTimer> {
    return this.http.put<LogoutTimer>(
      this.baseUrl + '/' + LogoutTimer.logoutTimerID,
      LogoutTimer
    );
  }
}
