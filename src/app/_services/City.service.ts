import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/City.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  model: any;

  baseUrl = 'https://localhost:7113/api/City';

  constructor(private http: HttpClient) {}

  //get all Citys
  getAllCitys(): Observable<City[]> {
    this.model = this.http.get<City[]>(this.baseUrl);
    return this.http.get<City[]>(this.baseUrl);
  }

  addCity(City: City): Observable<City> {
    return this.http.post<City>(this.baseUrl, City);
  }

  deleteCity(id: number): Observable<City> {
    return this.http.delete<City>(this.baseUrl + '/' + id);
  }

  updateCity(City: City): Observable<City> {
    return this.http.put<City>(this.baseUrl + '/' + City.cityID, City);
  }
}
