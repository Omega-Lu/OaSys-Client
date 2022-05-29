import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Debtor } from '../models/debtor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {
  model: any;

  baseUrl = 'https://localhost:7113/api/CustomerAccount'

  constructor(private http: HttpClient) {

   }

   getAllDebtors(): Observable<Debtor[]>{
     this.model = this.http.get<Debtor[]>(this.baseUrl);
     return this.http.get<Debtor[]>(this.baseUrl)
   }

   addAllDebtors(debtor: Debtor): Observable<Debtor> {
     return this.http.post<Debtor>(this.baseUrl, debtor);
   }

   deleteDebtor(id: number): Observable<Debtor> {
    return this.http.delete<Debtor>(this.baseUrl + '/' + id);
  }

  updateDebtor(debtor: Debtor): Observable<Debtor>{
    return this.http.put<Debtor>(this.baseUrl + '/' + debtor.customeR_ACCOUNT_ID, debtor)
  }


}
