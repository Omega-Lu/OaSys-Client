import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate.model';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  model : any;

  baseUrl = 'https://localhost:7113/api/Rate'

  constructor(private http: HttpClient) { }

  //get all employees
  getAllEmployees(): Observable<Rate[]>{
    this.model = this.http.get<Rate[]>(this.baseUrl);
    return this.http.get<Rate[]>(this.baseUrl);

  }

  addEmployee(rate : Rate): Observable<Rate> {
    return this.http.post<Rate>(this.baseUrl, rate);
  }

  deleteEmployee(id: number): Observable<Rate> {
    return this.http.delete<Rate>(this.baseUrl + '/' + id);
  }

  updateEmployee(rate: Rate): Observable<Rate>{
    return this.http.put<Rate>(this.baseUrl + '/' + rate.ratE_ID, rate)
  }

}