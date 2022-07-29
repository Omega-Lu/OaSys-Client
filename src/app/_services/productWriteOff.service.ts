import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductWriteOff } from '../models/ProductWriteOff.model';

@Injectable({
  providedIn: 'root',
})
export class ProductWriteOffService {
  model: any;

  baseUrl = 'https://localhost:7113/api/ProductWriteOff';

  constructor(private http: HttpClient) {}

  //get all ProductWriteOffs
  getAllProductWriteOffs(): Observable<ProductWriteOff[]> {
    this.model = this.http.get<ProductWriteOff[]>(this.baseUrl);
    return this.http.get<ProductWriteOff[]>(this.baseUrl);
  }

  addProductWriteOff(
    ProductWriteOff: ProductWriteOff
  ): Observable<ProductWriteOff> {
    return this.http.post<ProductWriteOff>(this.baseUrl, ProductWriteOff);
  }

  deleteProductWriteOff(id: number): Observable<ProductWriteOff> {
    return this.http.delete<ProductWriteOff>(this.baseUrl + '/' + id);
  }

  updateProductWriteOff(
    ProductWriteOff: ProductWriteOff
  ): Observable<ProductWriteOff> {
    return this.http.put<ProductWriteOff>(
      this.baseUrl + '/' + ProductWriteOff.productWriteOffID,
      ProductWriteOff
    );
  }
}
