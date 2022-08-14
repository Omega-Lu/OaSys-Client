import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wage } from '../models/Wage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WageService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Wage';

  constructor(private http: HttpClient) {}

  getAllWages(): Observable<Wage[]> {
    this.model = this.http.get<Wage[]>(this.baseUrl);
    return this.http.get<Wage[]>(this.baseUrl);
  }

  addWage(Wage: Wage): Observable<Wage> {
    return this.http.post<Wage>(this.baseUrl, Wage);
  }

  deleteWage(id: number): Observable<Wage> {
    return this.http.delete<Wage>(this.baseUrl + '/' + id);
  }

  updateWage(Wage: Wage): Observable<Wage> {
    return this.http.put<Wage>(this.baseUrl + '/' + Wage.wageID, Wage);
  }
}
