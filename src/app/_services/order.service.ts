import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Order';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    this.model = this.http.get<Order[]>(this.baseUrl);
    return this.http.get<Order[]>(this.baseUrl);
  }

  addOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, Order);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.baseUrl + '/' + id);
  }

  updateOrder(Order: Order): Observable<Order> {
    return this.http.put<Order>(
      this.baseUrl + '/' + Order.orderID,
      Order
    );
  }
}
