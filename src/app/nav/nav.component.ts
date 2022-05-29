import { Component, OnInit } from '@angular/core';
//import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  landingPage: boolean = true;
  addEmployee: boolean = false;
  addEmployeeType: boolean = false;
  addWageRate: boolean = false;
  addWarning: boolean = false;
  addWarningType: boolean = false;
  addSupplier: boolean = false;
  addProduct: boolean = false;
  addDebtor: boolean = false;
  searchDebtor: boolean = false;
  searchEmployee: boolean = false;
  searchEmployeeType: boolean = false;
  searchWageRate: boolean = false;
  searchWarning: boolean = false;
  searchWarningType: boolean = false;
  searchSupplier: boolean = false;
  searchProduct: boolean = false;
  maintainEmployee: boolean = false;
  maintainEmployeeType: boolean = false;
  maintainWageRate: boolean = false;
  maintainWarning: boolean = false;
  maintainWarningType: boolean = false;
  maintainSupplier: boolean = false;
  maintainProduct: boolean = false;
  maintainDebtor: boolean = false;



  back() {
    this.landingPage = true;

    console.log('back to Landing ' + this.landingPage);

    this.addDebtor = false;
    this.addEmployee = false;
    this.addEmployeeType = false;
    this.addWageRate = false;
    this.addWarning = false;
    this.addWarningType = false;
    this.addSupplier = false;
    this.addProduct = false;
    this.searchDebtor = false;
    this.searchEmployee = false;
    this.searchEmployeeType = false;
    this.searchWageRate = false;
    this.searchWarning = false;
    this.searchWarningType = false;
    this.searchSupplier = false;
    this.searchProduct = false;
    this.maintainEmployee = false;
    this.maintainEmployeeType = false;
    this.maintainWageRate = false;
    this.maintainWarning = false;
    this.maintainWarningType = false;
    this.maintainSupplier = false;
    this.maintainProduct = false;

  }
  //constructor(private accountService: AccountService) {}
  constructor(){
    this.loggedIn = true;
  }
  ngOnInit(): void {}

  // login() {
  //   this.accountService.login(this.model).subscribe(response =>
  //   {
  //     console.log(response);
  //     this.loggedIn = false;
  //   }, error =>
  //   {
  //     console.log(error);

  //   })
  // }

  logout() {
    this.loggedIn = false;
  }
}
