import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductOrderReturn } from '../models/productOrderReturn.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductOrderReturnService {
  model: any;

  baseUrl = 'https://localhost:7113/api/ProductOrderReturn';

  constructor(private http: HttpClient) {}

  getAllProductOrderReturns(): Observable<ProductOrderReturn[]> {
    this.model = this.http.get<ProductOrderReturn[]>(this.baseUrl);
    return this.http.get<ProductOrderReturn[]>(this.baseUrl);
  }

  addProductOrderReturn(
    ProductOrderReturn: ProductOrderReturn
  ): Observable<ProductOrderReturn> {
    return this.http.post<ProductOrderReturn>(this.baseUrl, ProductOrderReturn);
  }

  deleteProductOrderReturn(id: number): Observable<ProductOrderReturn> {
    return this.http.delete<ProductOrderReturn>(this.baseUrl + '/' + id);
  }

  updateProductOrderReturn(
    ProductOrderReturn: ProductOrderReturn
  ): Observable<ProductOrderReturn> {
    return this.http.put<ProductOrderReturn>(
      this.baseUrl + '/' + ProductOrderReturn.productOrderReturnID,
      ProductOrderReturn
    );
  }
}
