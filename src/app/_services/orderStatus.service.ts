import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderStatus } from '../models/orderStatus.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  model: any;

  baseUrl = 'https://localhost:7113/api/OrderStatus';

  constructor(private http: HttpClient) {}

  getAllOrderStatuss(): Observable<OrderStatus[]> {
    this.model = this.http.get<OrderStatus[]>(this.baseUrl);
    return this.http.get<OrderStatus[]>(this.baseUrl);
  }

  addOrderStatus(OrderStatus: OrderStatus): Observable<OrderStatus> {
    return this.http.post<OrderStatus>(this.baseUrl, OrderStatus);
  }

  deleteOrderStatus(id: number): Observable<OrderStatus> {
    return this.http.delete<OrderStatus>(this.baseUrl + '/' + id);
  }

  updateOrderStatus(OrderStatus: OrderStatus): Observable<OrderStatus> {
    return this.http.put<OrderStatus>(
      this.baseUrl + '/' + OrderStatus.orderStatusID,
      OrderStatus
    );
  }
}
