import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderReturn } from '../models/orderReturn.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderReturnService {
  model: any;

  baseUrl = 'https://localhost:7113/api/OrderReturn';

  constructor(private http: HttpClient) {}

  getAllOrderReturns(): Observable<OrderReturn[]> {
    this.model = this.http.get<OrderReturn[]>(this.baseUrl);
    return this.http.get<OrderReturn[]>(this.baseUrl);
  }

  addOrderReturn(OrderReturn: OrderReturn): Observable<OrderReturn> {
    return this.http.post<OrderReturn>(this.baseUrl, OrderReturn);
  }

  deleteOrderReturn(id: number): Observable<OrderReturn> {
    return this.http.delete<OrderReturn>(this.baseUrl + '/' + id);
  }

  updateOrderReturn(OrderReturn: OrderReturn): Observable<OrderReturn> {
    return this.http.put<OrderReturn>(
      this.baseUrl + '/' + OrderReturn.orderReturnID,
      OrderReturn
    );
  }
}
