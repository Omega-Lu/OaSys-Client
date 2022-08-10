import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountStatus } from '../models/AccountStatus.model';

@Injectable({
  providedIn: 'root',
})
export class AccountStatusService {
  model: any;

  baseUrl = 'https://localhost:7113/api/AccountStatus';

  constructor(private http: HttpClient) {}

  //get all AccountStatuss
  getAllAccountStatusses(): Observable<AccountStatus[]> {
    this.model = this.http.get<AccountStatus[]>(this.baseUrl);
    return this.http.get<AccountStatus[]>(this.baseUrl);
  }

  addAccountStatus(AccountStatus: AccountStatus): Observable<AccountStatus> {
    console.log('something account status');
    console.log(AccountStatus);
    console.log('after account status');
    console.log(AccountStatus.descrption);
    console.log('after account status description');
    AccountStatus.descrption = 'something';
    return this.http.post<AccountStatus>(this.baseUrl, AccountStatus);
  }

  deleteAccountStatus(id: number): Observable<AccountStatus> {
    return this.http.delete<AccountStatus>(this.baseUrl + '/' + id);
  }

  updateAccountStatus(AccountStatus: AccountStatus): Observable<AccountStatus> {
    return this.http.put<AccountStatus>(
      this.baseUrl + '/' + AccountStatus.accountStatusID,
      AccountStatus
    );
  }
}
