import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleReturn } from '../models/SaleReturn.model';

@Injectable({
  providedIn: 'root',
})
export class SaleReturnService {
  model: any;

  baseUrl = 'https://localhost:7113/api/SaleReturn';

  constructor(private http: HttpClient) {}

  //get all SaleReturns
  getAllSaleReturns(): Observable<SaleReturn[]> {
    this.model = this.http.get<SaleReturn[]>(this.baseUrl);
    return this.http.get<SaleReturn[]>(this.baseUrl);
  }

  addSaleReturn(SaleReturn: SaleReturn): Observable<SaleReturn> {
    return this.http.post<SaleReturn>(this.baseUrl, SaleReturn);
  }

  deleteSaleReturn(id: number): Observable<SaleReturn> {
    return this.http.delete<SaleReturn>(this.baseUrl + '/' + id);
  }

  updateSaleReturn(SaleReturn: SaleReturn): Observable<SaleReturn> {
    return this.http.put<SaleReturn>(
      this.baseUrl + '/' + SaleReturn.saleReturnID,
      SaleReturn
    );
  }
}
