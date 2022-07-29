import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WriteOff } from '../models/WriteOff.model';

@Injectable({
  providedIn: 'root',
})
export class WriteOffService {
  model: any;

  baseUrl = 'https://localhost:7113/api/WriteOff';

  constructor(private http: HttpClient) {}

  //get all WriteOffs
  getAllWriteOffs(): Observable<WriteOff[]> {
    this.model = this.http.get<WriteOff[]>(this.baseUrl);
    return this.http.get<WriteOff[]>(this.baseUrl);
  }

  addWriteOff(WriteOff: WriteOff): Observable<WriteOff> {
    return this.http.post<WriteOff>(this.baseUrl, WriteOff);
  }

  deleteWriteOff(id: number): Observable<WriteOff> {
    return this.http.delete<WriteOff>(this.baseUrl + '/' + id);
  }

  updateWriteOff(WriteOff: WriteOff): Observable<WriteOff> {
    return this.http.put<WriteOff>(
      this.baseUrl + '/' + WriteOff.writeOffID,
      WriteOff
    );
  }
}
