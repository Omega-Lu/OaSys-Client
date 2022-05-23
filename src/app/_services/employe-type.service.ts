import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeType } from '../models/employee-type.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  model : any;

  baseUrl = 'https://localhost:7113/api/EmployeeType'

  constructor(private http: HttpClient) { }

  //get all employees
  getAllEmployees(): Observable<EmployeeType[]>{
    this.model = this.http.get<EmployeeType[]>(this.baseUrl);
    return this.http.get<EmployeeType[]>(this.baseUrl);

  }

  addEmployee(employeetype : EmployeeType): Observable<EmployeeType> {
    return this.http.post<EmployeeType>(this.baseUrl, employeetype);
  }

  deleteEmployee(id: number): Observable<EmployeeType> {
    return this.http.delete<EmployeeType>(this.baseUrl + '/' + id);
  }

  updateEmployee(employeetype: EmployeeType): Observable<EmployeeType>{
    return this.http.put<EmployeeType>(this.baseUrl + '/' + employeetype.employeE_TYPE_ID, employeetype)
  }

}