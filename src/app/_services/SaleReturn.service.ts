import { Injectable } from "@angular/core";
import { SaleReturn } from '../models/SaleReturn.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SaleReturnService{
  model: any;

  baseUrl = 'https://localhost:7113/api/SaleReturn';

  constructor(private http: HttpClient){}

  getAllSaleReturns(): Observable<SaleReturn[]>{
    this.model = this.http.get<SaleReturn[]>(this.baseUrl)
    return this.http.get<SaleReturn[]>(this.baseUrl)
  }

  addSaleReturn(saleReturn: SaleReturn): Observable<SaleReturn> {
    return this.http.post<SaleReturn>(this.baseUrl, saleReturn)
  }

  updateSaleReturn(saleReturn: SaleReturn) : Observable<SaleReturn>{
    return this.http.put<SaleReturn>(this.baseUrl + '/' + saleReturn.ReturnID, saleReturn)
  }

  deleteSaleReturn(id: number) : Observable<SaleReturn>{
    return this.http.delete<SaleReturn>(this.baseUrl + '/' + id);
  }
}
