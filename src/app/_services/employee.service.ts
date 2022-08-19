import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Employee';

  constructor(private http: HttpClient) {}

  //get all employees
  getAllEmployees(): Observable<Employee[]> {
    this.model = this.http.get<Employee[]>(this.baseUrl);
    return this.model;
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.baseUrl + '/' + id);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      this.baseUrl + '/' + employee.employeE_ID,
      employee
    );
  }

}
