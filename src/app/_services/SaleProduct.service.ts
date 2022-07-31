import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SaleProduct } from "../models/SaleProduct.model";

@Injectable({
  providedIn: 'root'
})

export class SaleProductService{
  model: any;

  baseUrl = 'https://localhost:7113/api/SaleProduct';

  constructor(private http: HttpClient){}

  getAllSaleProducts(): Observable<SaleProduct[]>{
    this.model = this.http.get<SaleProduct[]>(this.baseUrl)
    return this.http.get<SaleProduct[]>(this.baseUrl)
  }

  addSaleReturn(saleProduct: SaleProduct): Observable<SaleProduct> {
    return this.http.post<SaleProduct>(this.baseUrl, saleProduct)
  }

  updateSaleReturn(saleProduct: SaleProduct) : Observable<SaleProduct>{
    return this.http.put<SaleProduct>(this.baseUrl + '/' + saleProduct.ProductID, saleProduct)
  }

  deleteSaleReturn(id: number) : Observable<SaleProduct>{
    return this.http.delete<SaleProduct>(this.baseUrl + '/' + id);
  }
}
