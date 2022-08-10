import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/Sale.model';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Sale';

  constructor(private http: HttpClient) {}

  //get all Sales
  getAllSales(): Observable<Sale[]> {
    this.model = this.http.get<Sale[]>(this.baseUrl);
    return this.http.get<Sale[]>(this.baseUrl);
  }

  addSale(Sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, Sale);
  }

  deleteSale(id: number): Observable<Sale> {
    return this.http.delete<Sale>(this.baseUrl + '/' + id);
  }

  updateSale(Sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(this.baseUrl + '/' + Sale.saleID, Sale);
  }
}
