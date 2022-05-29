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
  addCustomerAccount: boolean = false;
  searchEmployee: boolean = false;
  searchEmployeeType: boolean = false;
  searchWageRate: boolean = false;
  searchWarning: boolean = false;
  searchWarningType: boolean = false;
  searchSupplier: boolean = false;
  searchProduct: boolean = false;
  searchCustomerAccount: boolean = false;
  maintainEmployee: boolean = false;
  maintainEmployeeType: boolean = false;
  maintainWageRate: boolean = false;
  maintainWarning: boolean = false;
  maintainWarningType: boolean = false;
  maintainSupplier: boolean = false;
  maintainProduct: boolean = false;
  maintainCustomerAccount: boolean = false;
  addProductCategory: boolean = false;
  searchProductCategory: boolean = false;
  maintainProductCategory: boolean = false;
  addProductType: boolean = false;
  searchProductType: boolean = false;
  maintainProductType: boolean = false;
  navName: string = 'LANDING PAGE';

  back() {
    this.landingPage = true;
    this.navName = 'LANDING PAGE';
    console.log('back to Landing ' + this.landingPage);

    this.addEmployee = false;
    this.addEmployeeType = false;
    this.addWageRate = false;
    this.addWarning = false;
    this.addWarningType = false;
    this.addSupplier = false;
    this.addProduct = false;
    this.addCustomerAccount = false;
    this.searchEmployee = false;
    this.searchEmployeeType = false;
    this.searchWageRate = false;
    this.searchWarning = false;
    this.searchWarningType = false;
    this.searchSupplier = false;
    this.searchProduct = false;
    this.searchCustomerAccount = false;
    this.maintainEmployee = false;
    this.maintainEmployeeType = false;
    this.maintainWageRate = false;
    this.maintainWarning = false;
    this.maintainWarningType = false;
    this.maintainSupplier = false;
    this.maintainProduct = false;
    this.maintainCustomerAccount = false;
    this.addProductCategory = false;
    this.searchProductCategory = false;
    this.maintainProductCategory = false;
    this.addProductType = false;
    this.searchProductType = false;
    this.maintainProductType = false;
  }
  //constructor(private accountService: AccountService) {}
  constructor() {
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
