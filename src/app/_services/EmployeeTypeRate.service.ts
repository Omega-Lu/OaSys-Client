import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeTypeRate } from '../models/EmployeeTypeRate.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeTypeRateService {
  model: any;

  baseUrl = 'https://localhost:7113/api/EmployeeTypeRate';

  constructor(private http: HttpClient) {}

  //get all EmployeeTypeRates
  getAllEmployeeTypeRates(): Observable<EmployeeTypeRate[]> {
    this.model = this.http.get<EmployeeTypeRate[]>(this.baseUrl);
    return this.http.get<EmployeeTypeRate[]>(this.baseUrl);
  }

  addEmployeeTypeRate(
    EmployeeTypeRate: EmployeeTypeRate
  ): Observable<EmployeeTypeRate> {
    return this.http.post<EmployeeTypeRate>(this.baseUrl, EmployeeTypeRate);
  }

  deleteEmployeeTypeRate(id: number): Observable<EmployeeTypeRate> {
    return this.http.delete<EmployeeTypeRate>(this.baseUrl + '/' + id);
  }

  updateEmployeeTypeRate(
    EmployeeTypeRate: EmployeeTypeRate
  ): Observable<EmployeeTypeRate> {
    return this.http.put<EmployeeTypeRate>(
      this.baseUrl + '/' + EmployeeTypeRate.employeeTypeRateID,
      EmployeeTypeRate
    );
  }
}
