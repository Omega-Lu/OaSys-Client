import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/Province.model';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Province';

  constructor(private http: HttpClient) {}

  //get all Provinces
  getAllProvinces(): Observable<Province[]> {
    this.model = this.http.get<Province[]>(this.baseUrl);
    return this.http.get<Province[]>(this.baseUrl);
  }

  addProvince(Province: Province): Observable<Province> {
    return this.http.post<Province>(this.baseUrl, Province);
  }

  deleteProvince(id: number): Observable<Province> {
    return this.http.delete<Province>(this.baseUrl + '/' + id);
  }

  updateProvince(Province: Province): Observable<Province> {
    return this.http.put<Province>(
      this.baseUrl + '/' + Province.provinceID,
      Province
    );
  }
}
