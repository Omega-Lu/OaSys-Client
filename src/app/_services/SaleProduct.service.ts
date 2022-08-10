import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleProduct } from '../models/SaleProduct.model';

@Injectable({
  providedIn: 'root',
})
export class SaleProductService {
  model: any;

  baseUrl = 'https://localhost:7113/api/SaleProduct';

  constructor(private http: HttpClient) {}

  //get all SaleProducts
  getAllSaleProducts(): Observable<SaleProduct[]> {
    this.model = this.http.get<SaleProduct[]>(this.baseUrl);
    return this.http.get<SaleProduct[]>(this.baseUrl);
  }

  addSaleProduct(SaleProduct: SaleProduct): Observable<SaleProduct> {
    return this.http.post<SaleProduct>(this.baseUrl, SaleProduct);
  }

  deleteSaleProduct(id: number): Observable<SaleProduct> {
    return this.http.delete<SaleProduct>(this.baseUrl + '/' + id);
  }

  updateSaleProduct(SaleProduct: SaleProduct): Observable<SaleProduct> {
    return this.http.put<SaleProduct>(
      this.baseUrl + '/' + SaleProduct.saleProductID,
      SaleProduct
    );
  }
}
