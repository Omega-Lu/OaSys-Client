import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocktake } from '../models/Stocktake.model';

@Injectable({
  providedIn: 'root',
})
export class StocktakeService {
  model: any;

  baseUrl = 'https://localhost:7113/api/Stocktake';

  constructor(private http: HttpClient) {}

  //get all Stocktakes
  getAllStocktakes(): Observable<Stocktake[]> {
    this.model = this.http.get<Stocktake[]>(this.baseUrl);
    return this.http.get<Stocktake[]>(this.baseUrl);
  }

  addStocktake(Stocktake: Stocktake): Observable<Stocktake> {
    return this.http.post<Stocktake>(this.baseUrl, Stocktake);
  }

  deleteStocktake(id: number): Observable<Stocktake> {
    return this.http.delete<Stocktake>(this.baseUrl + '/' + id);
  }

  updateStocktake(Stocktake: Stocktake): Observable<Stocktake> {
    return this.http.put<Stocktake>(
      this.baseUrl + '/' + Stocktake.stocktakeID,
      Stocktake
    );
  }
}
