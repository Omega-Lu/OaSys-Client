import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderProduct } from '../models/orderProduct.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderProductService {
  model: any;

  baseUrl = 'https://localhost:7113/api/OrderProduct';

  constructor(private http: HttpClient) {}

  getAllOrderProducts(): Observable<OrderProduct[]> {
    this.model = this.http.get<OrderProduct[]>(this.baseUrl);
    return this.http.get<OrderProduct[]>(this.baseUrl);
  }

  addOrderProduct(OrderProduct: OrderProduct): Observable<OrderProduct> {
    return this.http.post<OrderProduct>(this.baseUrl, OrderProduct);
  }

  deleteOrderProduct(id: number): Observable<OrderProduct> {
    return this.http.delete<OrderProduct>(this.baseUrl + '/' + id);
  }

  updateOrderProduct(OrderProduct: OrderProduct): Observable<OrderProduct> {
    return this.http.put<OrderProduct>(this.baseUrl + '/' + OrderProduct.orderProductID, OrderProduct);
  }
}
