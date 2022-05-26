import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/Product-Category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  model: any;

  baseUrl = 'https://localhost:7113/api/ProductCategory';

  constructor(private http: HttpClient) {}

  //get all product categories
  getAllProductCategories(): Observable<ProductCategory[]> {
    this.model = this.http.get<ProductCategory[]>(this.baseUrl);
    return this.http.get<ProductCategory[]>(this.baseUrl);
  }

  addProductCategory(
    ProductCategory: ProductCategory
  ): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(this.baseUrl, ProductCategory);
  }

  deleteProductCategory(id: number): Observable<ProductCategory> {
    return this.http.delete<ProductCategory>(this.baseUrl + '/' + id);
  }

  updateProductCategory(
    ProductCategory: ProductCategory
  ): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(
      this.baseUrl + '/' + ProductCategory.producT_CATEGORY_ID,
      ProductCategory
    );
  }
}
