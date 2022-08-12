import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-wage-report',
  templateUrl: './wage-report.component.html',
  styleUrls: ['./wage-report.component.css'],
})
export class WageReportComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  Date: Date = new Date();

  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  constructor(private currentUserService: CurrentUserService) {}

  async ngOnInit() {
    await this.getAllCurrentUsers();

    await this.sleep(200);

    this.buildTable();
  }

  buildTable() {}

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('this is the current user for stock report');
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];
      console.log(this.currentUser);
    });
  }

  Return() {
    this.return.emit('false');
  }
}
