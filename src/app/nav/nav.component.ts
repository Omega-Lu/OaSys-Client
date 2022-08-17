import { Component, OnInit } from '@angular/core';

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
  navName: string = 'LANDING PAGE';
  applyForCredit: boolean = false;
  approveCredit: boolean = false;
  viewDebtorAccount: boolean = false;
  makeSale: boolean = false;
  searchSale: boolean = false;
  returnSale: boolean = false;
  salesReport: boolean = false;
  stockReport: boolean = false;
  wageReport: boolean = false;
  debtorsReport: boolean = false;
  calculateWages: boolean = false;
  auditLogClick: boolean = false;

  employee: boolean = true;
  supplier: boolean = false;
  product: boolean = false;
  debtor: boolean = false;
  maintainDebtor: boolean = false;
  supplierOrder: boolean = false;
  sale: boolean = false;
  reports: boolean = false;
  auditLog: boolean = false;

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
    this.viewDebtorAccount = false;
    this.applyForCredit = false;
    this.approveCredit = false;
    this.makeSale = false;
    this.searchSale = false;
    this.returnSale = false;
    this.salesReport = false;
    this.stockReport = false;
    this.wageReport = false;
    this.debtorsReport = false;
    this.calculateWages = false;
    this.auditLogClick = false;
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
    this.supplierOrder = false;
    this.sale = false;
    this.reports = false;
    this.auditLog = false;
  }

  clickSupplier() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = true;
    this.supplierOrder = false;
    this.sale = false;
    this.reports = false;
    this.auditLog = false;
  }

  clickProduct() {
    this.back();
    this.employee = false;
    this.product = true;
    this.debtor = false;
    this.supplier = false;
    this.supplierOrder = false;
    this.sale = false;
    this.reports = false;
    this.auditLog = false;
  }

  clickDebtor() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = true;
    this.supplier = false;
    this.supplierOrder = false;
    this.sale = false;
    this.reports = false;
    this.auditLog = false;
  }

  clickSupplierOrder() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.supplierOrder = true;
    this.sale = false;
    this.reports = false;
    this.auditLog = false;
  }

  clickSale() {
    this.back();
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.supplierOrder = false;
    this.sale = true;
    this.reports = false;
    this.auditLog = false;
  }

  clickReports() {
    this.back();
    this.reports = true;
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.supplierOrder = false;
    this.sale = false;
    this.auditLog = false;
  }

  clickAuditLog() {
    this.back();
    this.reports = false;
    this.employee = false;
    this.product = false;
    this.debtor = false;
    this.supplier = false;
    this.supplierOrder = false;
    this.sale = false;
    this.auditLog = true;
  }

  ngOnInit(): void {}

  logout() {
    this.loggedIn = false;
  }
}
