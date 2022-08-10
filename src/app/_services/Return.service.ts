import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Return } from '../models/Return.model';

@Injectable({
  providedIn: 'root',
})
export class ReturnService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Return';

  constructor(private http: HttpClient) {}

  //get all Returns
  getAllReturns(): Observable<Return[]> {
    this.model = this.http.get<Return[]>(this.baseUrl);
    return this.http.get<Return[]>(this.baseUrl);
  }

  addReturn(Return: Return): Observable<Return> {
    return this.http.post<Return>(this.baseUrl, Return);
  }

  deleteReturn(id: number): Observable<Return> {
    return this.http.delete<Return>(this.baseUrl + '/' + id);
  }

  updateReturn(Return: Return): Observable<Return> {
    return this.http.put<Return>(this.baseUrl + '/' + Return.returnID, Return);
  }
}
