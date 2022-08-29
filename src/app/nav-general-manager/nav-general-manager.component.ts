import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../_services/CurrentUser.service';
import { CurrentUser } from '../models/CurrentUser.model';

@Component({
  selector: 'app-nav-general-manager',
  templateUrl: './nav-general-manager.component.html',
  styleUrls: ['./nav-general-manager.component.css'],
})
export class NavGeneralManagerComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  @Input() loggedIn: boolean;
  @Input() username: string = '';

  navName: string = 'LANDING PAGE';

  currentUser: CurrentUser = null;
  currentUsers: CurrentUser[] = [];

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    this.loggedIn = true;
  }

  ngOnInit() {
    this.getAllCurrentUsers();
    this.router.navigate(['/product-page']);
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/app']);
    this.return.emit('false');
    this.getAllCurrentUsers();
  }

  setCurrentUser() {
    this.currentUser = this.currentUsers[this.currentUsers.length - 1];
    this.username = this.currentUser.username;
  }

  getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      this.setCurrentUser();
    });
  }
}
