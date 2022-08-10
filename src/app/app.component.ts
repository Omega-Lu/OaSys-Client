import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './_services/user.service';
import { FormGroup } from '@angular/forms';
import { CurrentUser } from './models/CurrentUser.model';
import { CurrentUserService } from './_services/CurrentUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  details: boolean = true;
  username: string = '';
  password: string = '';
  sdetails: boolean = true;

  user: User;
  users: User[] = [];
  usersTemp: User[] = [];

  currentUser: CurrentUser = {
    id: 0,
    userID: 0,
  };
  currentUsers: CurrentUser[] = [];

  userID: number;

  title = 'OaSys';
  loggedIn: boolean;
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService
  ) {
    this.loggedIn = false;
    console.log(this.loggedIn);
  }

  ngOnInit() {
    this.getUsers();
  }

  login() {
    this.usersTemp = this.users;
    console.log('by login');
    console.log(this.username);

    this.usersTemp = this.usersTemp.filter((user) => {
      console.log(user.username == this.username);
      return user.username == this.username;
    });

    console.log(this.usersTemp);

    if (this.usersTemp.length == 0) {
      this.details = false;
    } else {
      this.details = true;
      if (this.usersTemp[0].useR_PASSWORD == this.password) {
        this.loggedIn = true;
        console.log('THe Current User ID');
        console.log(this.usersTemp[0].useR_ID);
        this.currentUser.userID = this.usersTemp[0].useR_ID;
        this.currentUserService
          .addCurrentUser(this.currentUser)
          .subscribe((response) => {
            console.log('this is the current user');
            console.log(response);
          });
      } else {
        this.sdetails = false;
      }
    }
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log(response);
    });
  }
}
