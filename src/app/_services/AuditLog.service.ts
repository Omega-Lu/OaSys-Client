import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditLog } from '../models/AuditLog.model';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  model: any;

  baseUrl = 'https://localhost:7113/api/AuditLog';

  constructor(private http: HttpClient) {}

  //get all AuditLogs
  getAllAuditLogs(): Observable<AuditLog[]> {
    this.model = this.http.get<AuditLog[]>(this.baseUrl);
    return this.http.get<AuditLog[]>(this.baseUrl);
  }

  addAuditLog(AuditLog: AuditLog): Observable<AuditLog> {
    return this.http.post<AuditLog>(this.baseUrl, AuditLog);
  }

  deleteAuditLog(id: number): Observable<AuditLog> {
    return this.http.delete<AuditLog>(this.baseUrl + '/' + id);
  }

  updateAuditLog(AuditLog: AuditLog): Observable<AuditLog> {
    return this.http.put<AuditLog>(
      this.baseUrl + '/' + AuditLog.auditLogID,
      AuditLog
    );
  }
}
