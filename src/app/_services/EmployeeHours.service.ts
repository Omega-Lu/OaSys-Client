import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeHours } from '../models/EmployeeHours.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeHoursService {
  model: any;

  baseUrl = 'https://localhost:7113/api/EmployeeHours';

  constructor(private http: HttpClient) {}

  getAllEmployeeHourss(): Observable<EmployeeHours[]> {
    this.model = this.http.get<EmployeeHours[]>(this.baseUrl);
    return this.http.get<EmployeeHours[]>(this.baseUrl);
  }

  addEmployeeHours(EmployeeHours: EmployeeHours): Observable<EmployeeHours> {
    return this.http.post<EmployeeHours>(this.baseUrl, EmployeeHours);
  }

  deleteEmployeeHours(id: number): Observable<EmployeeHours> {
    return this.http.delete<EmployeeHours>(this.baseUrl + '/' + id);
  }

  updateEmployeeHours(EmployeeHours: EmployeeHours): Observable<EmployeeHours> {
    return this.http.put<EmployeeHours>(
      this.baseUrl + '/' + EmployeeHours.employeeHoursID,
      EmployeeHours
    );
  }
}
