import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vat } from '../models/Vat.model';

@Injectable({
  providedIn: 'root',
})
export class VatService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Vat';

  constructor(private http: HttpClient) {}

  //get all Vats
  getAllVatses(): Observable<Vat[]> {
    this.model = this.http.get<Vat[]>(this.baseUrl);
    return this.http.get<Vat[]>(this.baseUrl);
  }

  addVat(Vat: Vat): Observable<Vat> {
    return this.http.post<Vat>(this.baseUrl, Vat);
  }

  deleteVat(id: number): Observable<Vat> {
    return this.http.delete<Vat>(this.baseUrl + '/' + id);
  }

  updateVat(Vat: Vat): Observable<Vat> {
    return this.http.put<Vat>(this.baseUrl + '/' + Vat.vatID, Vat);
  }
}
