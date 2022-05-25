import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerAccount } from '../models/Customer-account.model';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerAccountService {
  
    model : any;
  
    baseUrl = 'https://localhost:7113/api/CustomerAccount'
  
    constructor(private http: HttpClient) { }
  
    //get all customer-accounts
    getAllCustomerAccounts(): Observable<CustomerAccount[]>{
      this.model = this.http.get<CustomerAccount[]>(this.baseUrl);
      return this.http.get<CustomerAccount[]>(this.baseUrl);
  
    }
  
    addCustomerAccount(CustomerAccount : CustomerAccount): Observable<CustomerAccount> {
      return this.http.post<CustomerAccount>(this.baseUrl, CustomerAccount);
    }
  
    deleteCustomerAccount(id: number): Observable<CustomerAccount> {
      return this.http.delete<CustomerAccount>(this.baseUrl + '/' + id);
    }
  
    updateCustomerAccount(CustomerAccount: CustomerAccount): Observable<CustomerAccount>{
      return this.http.put<CustomerAccount>(this.baseUrl + '/' + CustomerAccount.customeR_ACCOUNT_ID, CustomerAccount)
    }
  
  }