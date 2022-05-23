import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warning } from '../models/warning.model';

@Injectable({
  providedIn: 'root'
})
export class WarningService {

  model : any;

  baseUrl = 'https://localhost:7113/api/Warning'

  constructor(private http: HttpClient) { }

  //get all employees
  getAllEmployees(): Observable<Warning[]>{
    this.model = this.http.get<Warning[]>(this.baseUrl);
    return this.http.get<Warning[]>(this.baseUrl);

  }

  addEmployee(warning : Warning): Observable<Warning> {
    return this.http.post<Warning>(this.baseUrl, warning);
  }

  deleteEmployee(id: number): Observable<Warning> {
    return this.http.delete<Warning>(this.baseUrl + '/' + id);
  }

  updateEmployee(warning: Warning): Observable<Warning>{
    return this.http.put<Warning>(this.baseUrl + '/' + warning.warninG_ID, warning)
  }

}