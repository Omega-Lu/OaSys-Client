import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeWarning } from '../models/EmployeeWarning.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeWarningService {
  model: any;

  baseUrl = 'https://localhost:7113/api/EmployeeWarning';

  constructor(private http: HttpClient) {}

  //get all EmployeeWarnings
  getAllEmployeeWarningses(): Observable<EmployeeWarning[]> {
    this.model = this.http.get<EmployeeWarning[]>(this.baseUrl);
    return this.http.get<EmployeeWarning[]>(this.baseUrl);
  }

  addEmployeeWarning(
    EmployeeWarning: EmployeeWarning
  ): Observable<EmployeeWarning> {
    return this.http.post<EmployeeWarning>(this.baseUrl, EmployeeWarning);
  }

  deleteEmployeeWarning(id: number): Observable<EmployeeWarning> {
    return this.http.delete<EmployeeWarning>(this.baseUrl + '/' + id);
  }

  updateEmployeeWarning(
    EmployeeWarning: EmployeeWarning
  ): Observable<EmployeeWarning> {
    return this.http.put<EmployeeWarning>(
      this.baseUrl + '/' + EmployeeWarning.employeeWarningID,
      EmployeeWarning
    );
  }
}
