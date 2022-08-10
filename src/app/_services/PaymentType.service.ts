import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/PaymentType.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService {
  model: any;

  baseUrl = 'https://localhost:7113/api/PaymentType';

  constructor(private http: HttpClient) {}

  //get all PaymentTypes
  getAllPaymentTypes(): Observable<PaymentType[]> {
    this.model = this.http.get<PaymentType[]>(this.baseUrl);
    return this.http.get<PaymentType[]>(this.baseUrl);
  }

  addPaymentType(PaymentType: PaymentType): Observable<PaymentType> {
    return this.http.post<PaymentType>(this.baseUrl, PaymentType);
  }

  deletePaymentType(id: number): Observable<PaymentType> {
    return this.http.delete<PaymentType>(this.baseUrl + '/' + id);
  }

  updatePaymentType(PaymentType: PaymentType): Observable<PaymentType> {
    return this.http.put<PaymentType>(
      this.baseUrl + '/' + PaymentType.paymentTypeID,
      PaymentType
    );
  }
}
