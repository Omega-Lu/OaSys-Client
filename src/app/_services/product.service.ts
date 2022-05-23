import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  model : any;

  baseUrl = 'https://localhost:7113/api/Product'

  constructor(private http: HttpClient) { }

  //get all products
  getAllProducts(): Observable<Product[]>{
    this.model = this.http.get<Product[]>(this.baseUrl);
    return this.http.get<Product[]>(this.baseUrl);

  }

  addProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + '/' + id);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(this.baseUrl + '/' + product.producT_ID, product)
  }

}