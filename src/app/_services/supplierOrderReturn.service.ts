import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupplierOrderReturn } from '../models/SupplierOrderReturn.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierOrderReturnService {
  model: any;

  baseUrl = 'https://localhost:7113/api/SupplierOrderReturn';

  constructor(private http: HttpClient) {}

  getAllSupplierOrderReturns(): Observable<SupplierOrderReturn[]> {
    this.model = this.http.get<SupplierOrderReturn[]>(this.baseUrl);
    return this.http.get<SupplierOrderReturn[]>(this.baseUrl);
  }

  addSupplierOrderReturn(
    SupplierOrderReturn: SupplierOrderReturn
  ): Observable<SupplierOrderReturn> {
    return this.http.post<SupplierOrderReturn>(
      this.baseUrl,
      SupplierOrderReturn
    );
  }

  deleteSupplierOrderReturn(id: number): Observable<SupplierOrderReturn> {
    return this.http.delete<SupplierOrderReturn>(this.baseUrl + '/' + id);
  }

  updateSupplierOrderReturn(
    SupplierOrderReturn: SupplierOrderReturn
  ): Observable<SupplierOrderReturn> {
    return this.http.put<SupplierOrderReturn>(
      this.baseUrl + '/' + SupplierOrderReturn.supplierOrderReturnID,
      SupplierOrderReturn
    );
  }
}
