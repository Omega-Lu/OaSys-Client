import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../models/Product-Type.model';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  model: any;

  baseUrl = 'https://localhost:7113/api/ProductType';

  constructor(private http: HttpClient) {}

  //get all product categories
  getAllProductTypes(): Observable<ProductType[]> {
    this.model = this.http.get<ProductType[]>(this.baseUrl);
    return this.http.get<ProductType[]>(this.baseUrl);
  }

  addProductType(ProductType: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(this.baseUrl, ProductType);
  }

  deleteProductType(id: number): Observable<ProductType> {
    return this.http.delete<ProductType>(this.baseUrl + '/' + id);
  }

  updateProductType(ProductType: ProductType): Observable<ProductType> {
    return this.http.put<ProductType>(
      this.baseUrl + '/' + ProductType.producT_TYPE_ID,
      ProductType
    );
  }
}
