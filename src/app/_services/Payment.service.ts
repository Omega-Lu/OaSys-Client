import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/Payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Payment';

  constructor(private http: HttpClient) {}

  //get all Payments
  getAllPayments(): Observable<Payment[]> {
    this.model = this.http.get<Payment[]>(this.baseUrl);
    return this.http.get<Payment[]>(this.baseUrl);
  }

  addPayment(Payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, Payment);
  }

  deletePayment(id: number): Observable<Payment> {
    return this.http.delete<Payment>(this.baseUrl + '/' + id);
  }

  updatePayment(Payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(
      this.baseUrl + '/' + Payment.paymentID,
      Payment
    );
  }
}
