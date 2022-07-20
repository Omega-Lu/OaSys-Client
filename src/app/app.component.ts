import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  details : boolean = true;
  username : string = '';
  password : string = '';
  sdetails : boolean = true;
  user: User;
  users: User[] = [];
  title = 'OaSys';
  loggedIn: boolean;
  loginForm: FormGroup;
  userservice :UserService;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.loggedIn = true;
    console.log(this.loggedIn);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })
    //this.getUsers();

   // throw new Error('Method not implemented.');

  }

  login() {

    if(this.username != 'admin'){
      this.details = false;
    } else if (this.password != 'admin') {
      this.sdetails = false;
    } else{
      console.log(this.loggedIn);
      this.loggedIn = true;
    }



    //console.log(this.user.username);

    //console.log(this.loggedIn);
  }

  // Search() {
  //   if(this.user.username !== ""){
  //      let searchValue = this.user.username
  //      console.log(searchValue);
  //     this.users = this.users.filter((user) =>{
  //        console.log(user.username.match(this.user.username));
  //        return this.user.username.match(searchValue);

  //            });
  //           console.log(this.user);
  //          }
  //    else {
  //      this.userservice.getAllEmployees();
  //    }
  //  }

}
