import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Supplier';

  constructor(private http: HttpClient) {}

  //get all Suppliers
  getAllSuppliers(): Observable<Supplier[]> {
    this.model = this.http.get<Supplier[]>(this.baseUrl);
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier);
  }

  deleteSupplier(id: number): Observable<Supplier> {
    return this.http.delete<Supplier>(this.baseUrl + '/' + id);
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(
      this.baseUrl + '/' + supplier.supplieR_ID,
      supplier
    );
  }
}
