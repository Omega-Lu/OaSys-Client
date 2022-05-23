import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarningType } from '../models/warning-type.model';

@Injectable({
  providedIn: 'root'
})
export class WarningTypeService {

  model : any;

  baseUrl = 'https://localhost:7113/api/WarningType'

  constructor(private http: HttpClient) { }

  //get all employees
  getAllEmployees(): Observable<WarningType[]>{
    this.model = this.http.get<WarningType[]>(this.baseUrl);
    return this.http.get<WarningType[]>(this.baseUrl);

  }

  addEmployee(warningtype : WarningType): Observable<WarningType> {
    return this.http.post<WarningType>(this.baseUrl, warningtype);
  }

  deleteEmployee(id: number): Observable<WarningType> {
    return this.http.delete<WarningType>(this.baseUrl + '/' + id);
  }

  updateEmployee(warningtype: WarningType): Observable<WarningType>{
    return this.http.put<WarningType>(this.baseUrl + '/' + warningtype.warninG_TYPE_ID, warningtype)
  }

}