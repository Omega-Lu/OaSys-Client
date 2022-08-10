import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerApplication } from '../models/CustomerApplication.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerApplicationService {
  model: any;

  baseUrl = 'https://localhost:7113/api/CustomerApplication';

  constructor(private http: HttpClient) {}

  //get all CustomerApplications
  getAllCustomerApplications(): Observable<CustomerApplication[]> {
    this.model = this.http.get<CustomerApplication[]>(this.baseUrl);
    return this.http.get<CustomerApplication[]>(this.baseUrl);
  }

  addCustomerApplication(
    CustomerApplication: CustomerApplication
  ): Observable<CustomerApplication> {
    return this.http.post<CustomerApplication>(
      this.baseUrl,
      CustomerApplication
    );
  }

  deleteCustomerApplication(id: number): Observable<CustomerApplication> {
    return this.http.delete<CustomerApplication>(this.baseUrl + '/' + id);
  }

  updateCustomerApplication(
    CustomerApplication: CustomerApplication
  ): Observable<CustomerApplication> {
    return this.http.put<CustomerApplication>(
      this.baseUrl + '/' + CustomerApplication.customerApplicationID,
      CustomerApplication
    );
  }
}
