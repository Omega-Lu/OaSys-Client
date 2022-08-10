import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './_services/user.service';
import { FormGroup } from '@angular/forms';

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

  title = 'OaSys';
  loggedIn: boolean;
  loginForm: FormGroup;

  constructor(private userService: UserService) {
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
