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
  addDebtor: boolean = false;
  searchDebtor: boolean = false;
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
  createSupplierOrder: boolean = false;
  receiveSupplierOrder: boolean = false;
  returnSupplierOrder: boolean = false;
  completeStocktake: boolean = false;
  reorderList: boolean = false;
  searchSupplierOrder: boolean = false;
  writeOff: boolean = false;
  applyForCredit: boolean = false;
  approveCredit: boolean = false;
  creditApplication: boolean = false;
  viewDebtorsAccount: boolean = false;
  searchDebtorAccount: boolean = false;
  maintainDebtor: boolean = false;
  viewSale: boolean = false;
  makeSale: boolean = false;
  ReturnSale: boolean = false;

  navName: string = 'LANDING PAGE';

  employee: boolean = true;
  supplier: boolean = false;
  product: boolean = false;
  debtor: boolean = false;
  sale: boolean = false;




  back() {
    this.landingPage = true;
    //this.navName = 'LANDING PAGE';
    console.log('back to Landing ' + this.landingPage);

    this.addDebtor = false;
    this.addEmployee = false;
    this.addEmployeeType = false;
    this.addWageRate = false;
    this.addWarning = false;
    this.addWarningType = false;
    this.addSupplier = false;
    this.addProduct = false;
    this.addCustomerAccount = false;
    this.searchDebtor = false;
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
    this.maintainDebtor = false;
    this.createSupplierOrder = false;
    this.searchSupplierOrder = false;
    this.receiveSupplierOrder = false;
    this.completeStocktake = false;
    this.reorderList = false;
    this.reorderList = false;
    this.returnSupplierOrder = false;
    this.writeOff = false;
    this.applyForCredit = false;
    this.approveCredit = false;
    this.creditApplication = false;
    this.viewDebtorsAccount = false;
    this.searchDebtorAccount = false;
    this.viewSale = false;
    this.makeSale = false;
    this.ReturnSale = false;
  }
  //constructor(private accountService: AccountService) {}
  constructor() {
    this.loggedIn = true;
  }

  clickEmployee() {
    this.back();
    this.employee = true;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.sale = false;
  }

  clickSupplier() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = true;
    this.sale = false;

  }

  clickProduct() {
    this.back();
    this.employee = false;
    this.product = true;
    this.debtor = false;
    this.supplier = false;
    this.sale = false;
  }

  clickDebtor() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = true;
    this.supplier = false;
    this.sale = false;
  }

  clickSupplierOrder() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.sale = false;


  }
  clickSales(){
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.sale = true;
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
