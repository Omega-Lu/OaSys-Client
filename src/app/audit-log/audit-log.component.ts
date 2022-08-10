import { Component, OnInit, Input } from '@angular/core';
import { AuditLog } from '../models/AuditLog.model';
import { AuditLogService } from '../_services/AuditLog.service';
import { CurrentUser } from '../models/CurrentUser.model';
import { CurrentUserService } from '../_services/CurrentUser.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css'],
})
export class AuditLogComponent implements OnInit {
  @Input() userID: number;

  auditLog: AuditLog;
  auditLogs: AuditLog[] = [];

  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];

  fuctionUsed: string;
  date: string;

  constructor(
    private auditLogService: AuditLogService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    if (this.userID != null) {
      this.currentUser.userID = this.userID;
      this.currentUserService
        .addCurrentUser(this.currentUser)
        .subscribe((response) => {
          console.log('this is the current user');
          console.log(response);
        });
    } else {
      this.getAllCurrentUsers();
    }
  }

  getAuditLogs() {
    this.auditLogService.getAllAuditLogs;
  }

  login(userID: number) {
    this.userID = userID;
    console.log('UserID: ' + this.userID);
  }

  usedFunction(functionUsed: string) {
    this.date = new Date().toString();
    this.fuctionUsed = functionUsed;

    console.log('UserID: ' + this.userID);
    console.log('Function used: ' + this.fuctionUsed);
    console.log('Date: ' + this.date);
  }

  getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log(response);
    });
  }
}
