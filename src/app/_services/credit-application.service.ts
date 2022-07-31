import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditApplication } from '../models/Credit-application.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditApplicationService{

  model: any;

  baseUrl = 'https://localhost:7113/api/CreditApplication'

  constructor(private http: HttpClient) {

  }

  getAllCreditApplications(): Observable<CreditApplication[]>{
    this.model = this.http.get<CreditApplication[]>(this.baseUrl);
    return this.http.get<CreditApplication[]>(this.baseUrl)
  }

  addCreditApplication(CreditApplication: CreditApplication): Observable<CreditApplication> {
    return this.http.post<CreditApplication>(this.baseUrl, CreditApplication);
  }

  deleteCustomerAccount(id: number): Observable<CreditApplication> {
    return this.http.delete<CreditApplication>(this.baseUrl + '/' + id);
  }

  updateCustomerAccount(CreditApplication: CreditApplication): Observable<CreditApplication>{
    return this.http.put<CreditApplication>(this.baseUrl + '/' + CreditApplication.customeR_ACCOUNT_ID, CreditApplication)
  }

}
