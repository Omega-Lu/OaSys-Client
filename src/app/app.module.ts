import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEployeeComponent } from './nav/employee-page/add-eployee/add-eployee.component';
import { AddEployeeTypeComponent } from './nav/employee-page/add-eployee-type/add-eployee-type.component';
import { AddWageRateComponent } from './nav/employee-page/add-wage-rate/add-wage-rate.component';
import { AddWarningComponent } from './nav/employee-page/add-warning/add-warning.component';
import { AddWarningTypeComponent } from './nav/employee-page/add-warning-type/add-warning-type.component';
import { SearchEmployeeComponent } from './nav/employee-page/search-employee/search-employee.component';
import { SearchEmployeeTypeComponent } from './nav/employee-page/search-employee-type/search-employee-type.component';
import { SearchWageRateComponent } from './nav/employee-page/search-wage-rate/search-wage-rate.component';
import { SearchWarningComponent } from './nav/employee-page/search-warning/search-warning.component';
import { SearchWarningTypeComponent } from './nav/employee-page/search-warning-type/search-warning-type.component';
import { MaintainEmployeeComponent } from './nav/employee-page/maintain-employee/maintain-employee.component';
import { MaintainEmployeeTypeComponent } from './nav/employee-page/maintain-employee-type/maintain-employee-type.component';
import { MaintainWageRateComponent } from './nav/employee-page/maintain-wage-rate/maintain-wage-rate.component';
import { MaintainWarningComponent } from './nav/employee-page/maintain-warning/maintain-warning.component';
import { MaintainWarningTypeComponent } from './nav/employee-page/maintain-warning-type/maintain-warning-type.component';
import { UpdateEmployeeComponent } from './nav/employee-page/maintain-employee/update-employee/update-employee.component';
import { UpdateEmployeeTypeComponent } from './nav/employee-page/maintain-employee-type/update-employee-type/update-employee-type.component';
import { UpdateWageRateComponent } from './nav/employee-page/maintain-wage-rate/update-wage-rate/update-wage-rate.component';
import { UpdateWarningComponent } from './nav/employee-page/maintain-warning/update-warning/update-warning.component';
import { UpdateWarningTypeComponent } from './nav/employee-page/maintain-warning-type/update-warning-type/update-warning-type.component';
import { AddSupplierComponent } from './nav/supplier-page/add-supplier/add-supplier.component';
import { SearchSupplierComponent } from './nav/supplier-page/search-supplier/search-supplier.component';
import { MaintainSupplierComponent } from './nav/supplier-page/maintain-supplier/maintain-supplier.component';
import { MaintainProductComponent } from './nav/product-page/maintain-product/maintain-product.component';
import { SearchProductComponent } from './nav/product-page/search-product/search-product.component';
import { AddProductComponent } from './nav/product-page/add-product/add-product.component';
import { AddDebtorComponent } from './nav/debtor-page/add-debtor/add-debtor.component';
import { SearchDebtorComponent } from './nav/debtor-page/search-debtor/search-debtor.component';
import { MaintainDebtorComponent } from './nav/debtor-page/maintain-debtor/maintain-debtor.component';
import { UpdateDebtorComponent } from './nav/debtor-page/maintain-debtor/update-debtor/update-debtor.component';
import { UpdateSupplierComponent } from './nav/supplier-page/maintain-supplier/update-supplier/update-supplier.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductCategoryComponent } from './nav/product-page/add-product-category/add-product-category.component';
import { AddProductTypeComponent } from './nav/product-page/add-product-type/add-product-type.component';
import { SearchProductCategoryComponent } from './nav/product-page/search-product-category/search-product-category.component';
import { SearchProductTypeComponent } from './nav/product-page/search-product-type/search-product-type.component';
import { MaintainProductTypeComponent } from './nav/product-page/maintain-product-type/maintain-product-type.component';
import { MaintainProductCategoryComponent } from './nav/product-page/maintain-product-category/maintain-product-category.component';
import { UpdateProductCategoryComponent } from './nav/product-page/maintain-product-category/update-product-category/update-product-category.component';
import { UpdateProductComponent } from './nav/product-page/maintain-product/update-product/update-product.component';
import { UpdateProductTypeComponent } from './nav/product-page/maintain-product-type/update-product-type/update-product-type.component';
import { CreateSupplierOrderComponent } from './nav/supplier-page/create-supplier-order/create-supplier-order.component';
import { ReceiveSupplierOrderComponent } from './nav/supplier-page/receive-supplier-order/receive-supplier-order.component';
import { ReorderListComponent } from './nav/supplier-page/reorder-list/reorder-list.component';
import { ReturnSupplierOrderComponent } from './nav/supplier-page/return-supplier-order/return-supplier-order.component';
import { SearchSupplierOrderComponent } from './nav/supplier-page/search-supplier-order/search-supplier-order.component';
import { CompleteStocktakeComponent } from './nav/product-page/complete-stocktake/complete-stocktake.component';
import { WriteOffComponent } from './nav/product-page/write-off/write-off.component';
import { SupplierOrderComponent } from './nav/supplier-page/create-supplier-order/supplier-order/supplier-order.component';
import { ReceiveOrderComponent } from './nav/supplier-page/receive-supplier-order/receive-order/receive-order.component';
import { ReturnOrderComponent } from './nav/supplier-page/return-supplier-order/return-order/return-order.component';
import { ApplyForCreditComponent } from './nav/debtor-page/apply-for-credit/apply-for-credit.component';
import { ApproveCreditComponent } from './nav/debtor-page/approve-credit/approve-credit.component';
import { ViewDebtorAccountComponent } from './nav/debtor-page/view-debtor-account/view-debtor-account.component';
import { ViewCreditAccountComponent } from './nav/debtor-page/approve-credit/view-credit-account/view-credit-account.component';
import { ViewApprovedAccountsComponent } from './nav/debtor-page/view-debtor-account/view-approved-accounts/view-approved-accounts.component';
import { MakeSaleComponent } from './nav/sale-page/make-sale/make-sale.component';
import { SearchSaleComponent } from './nav/sale-page/search-sale/search-sale.component';
import { ViewSaleComponent } from './nav/sale-page/search-sale/view-sale/view-sale.component';
import { CapturePaymentComponent } from './nav/debtor-page/capture-payment/capture-payment.component';
import { SalesReportComponent } from './nav/reports-page/sales-report/sales-report.component';
import { DebtorsReportComponent } from './nav/reports-page/debtors-report/debtors-report.component';
import { WageReportComponent } from './nav/reports-page/wage-report/wage-report.component';
import { StockReportComponent } from './nav/reports-page/stock-report/stock-report.component';
import { NgxPrintModule } from 'ngx-print';
import { CalculateWagesComponent } from './nav/employee-page/calculate-wages/calculate-wages.component';
import { CollectPayslipComponent } from './nav-cashier/employee-landing-page/collect-payslip/collect-payslip.component';
import { AuditLogComponent } from './nav/audit-log-page/audit-log/audit-log.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EmployeePageComponent } from './nav/employee-page/employee-page.component';
import { SupplierPageComponent } from './nav/supplier-page/supplier-page.component';
import { ProductPageComponent } from './nav/product-page/product-page.component';
import { DebtorPageComponent } from './nav/debtor-page/debtor-page.component';
import { SalePageComponent } from './nav/sale-page/sale-page.component';
import { ReportsPageComponent } from './nav/reports-page/reports-page.component';
import { AuditLogPageComponent } from './nav/audit-log-page/audit-log-page.component';
import { ValidationServicesComponent } from './validation-services/validation-services.component';
import { NavEmployeeComponent } from './nav-employee/nav-employee.component';
import { NavGeneralManagerComponent } from './nav-general-manager/nav-general-manager.component';
import { NavCashierComponent } from './nav-cashier/nav-cashier.component';
import { NavHRComponent } from './nav-hr/nav-hr.component';
import { EmployeeLandingPageComponent } from './nav-cashier/employee-landing-page/employee-landing-page.component';
import { ClockInAndOutComponent } from './nav-cashier/clock-in-and-out/clock-in-and-out.component';
import { ForgotResetPasswordComponent } from './forgot-reset-password/forgot-reset-password.component';
import { LogoutTimerComponent } from './nav/logout-timer/logout-timer.component';

const appRoutes: Routes = [
  { path: 'nav', component: NavComponent },
  { path: 'app', component: AppComponent },
  { path: 'add-debtor', component: AddDebtorComponent },
  { path: 'add-employee', component: AddEployeeComponent },
  { path: 'add-employee-type', component: AddEployeeTypeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-product-category', component: AddProductCategoryComponent },
  { path: 'add-product-type', component: AddProductTypeComponent },
  { path: 'add-supplier', component: AddSupplierComponent },
  { path: 'add-wage-rate', component: AddWageRateComponent },
  { path: 'add-warning', component: AddWarningComponent },
  { path: 'add-warning-type', component: AddWarningTypeComponent },
  { path: 'apply-for-credit', component: ApplyForCreditComponent },
  { path: 'approve-credit', component: ApproveCreditComponent },
  { path: 'audit-log', component: AuditLogComponent },
  { path: 'calculate-wages', component: CalculateWagesComponent },
  { path: 'capture-payment', component: CapturePaymentComponent },
  { path: 'collect-payslip', component: CollectPayslipComponent },
  { path: 'create-supplier-order', component: CreateSupplierOrderComponent },
  { path: 'debtors-report', component: DebtorsReportComponent },
  { path: 'maintain-debtor', component: MaintainDebtorComponent },
  { path: 'maintain-employee', component: MaintainEmployeeComponent },
  { path: 'maintain-employee-type', component: MaintainEmployeeTypeComponent },
  { path: 'maintain-product', component: MaintainProductComponent },
  {
    path: 'maintain-product-category',
    component: MaintainProductCategoryComponent,
  },
  { path: 'maintain-product-type', component: MaintainProductTypeComponent },
  { path: 'maintain-supplier', component: MaintainSupplierComponent },
  { path: 'maintain-wage-rate', component: MaintainWageRateComponent },
  { path: 'maintain-warning', component: MaintainWarningComponent },
  { path: 'maintain-warning-type', component: MaintainWarningTypeComponent },
  { path: 'make-sale', component: MakeSaleComponent },
  { path: 'receive-supplier-order', component: ReceiveSupplierOrderComponent },
  { path: 'reorder-list', component: ReorderListComponent },
  { path: 'return-supplier-order', component: ReturnSupplierOrderComponent },
  { path: 'sales-report', component: SalesReportComponent },
  { path: 'search-debtor', component: SearchDebtorComponent },
  { path: 'search-employee', component: SearchEmployeeComponent },
  { path: 'search-employee-type', component: SearchEmployeeTypeComponent },
  { path: 'search-product', component: SearchProductComponent },
  {
    path: 'search-product-category',
    component: SearchProductCategoryComponent,
  },
  { path: 'search-product-type', component: SearchProductTypeComponent },
  { path: 'search-sale', component: SearchSaleComponent },
  { path: 'search-supplier', component: SearchSupplierComponent },
  { path: 'search-supplier-order', component: SearchSupplierOrderComponent },
  { path: 'search-wage-rate', component: SearchWageRateComponent },
  { path: 'search-warning', component: SearchWarningComponent },
  { path: 'search-warning-type', component: SearchWarningTypeComponent },
  { path: 'stock-report', component: StockReportComponent },
  { path: 'view-debtor-account', component: ViewDebtorAccountComponent },
  { path: 'wage-report', component: WageReportComponent },
  { path: 'write-off', component: WriteOffComponent },
  { path: 'audit-log-page', component: AuditLogPageComponent },
  { path: 'debtor-page', component: DebtorPageComponent },
  { path: 'employee-page', component: EmployeePageComponent },
  { path: 'product-page', component: ProductPageComponent },
  { path: 'sale-page', component: SalePageComponent },
  { path: 'supplier-page', component: SupplierPageComponent },
  { path: 'reports-page', component: ReportsPageComponent },
  { path: 'landing-page', component: EmployeePageComponent },
  { path: 'update-employee', component: UpdateEmployeeComponent },
  { path: 'nav-employee', component: NavEmployeeComponent },
  { path: 'nav-cashier', component: NavCashierComponent },
  { path: 'nav-general-manager', component: NavGeneralManagerComponent },
  { path: 'nav-hr', component: NavHRComponent },
  { path: 'employee-landing-page', component: EmployeeLandingPageComponent },
  { path: 'forgot-reset-password', component: ForgotResetPasswordComponent },
  { path: 'logout-timer', component: LogoutTimerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddEployeeComponent,
    AddEployeeTypeComponent,
    AddWageRateComponent,
    AddWarningComponent,
    AddWarningTypeComponent,
    SearchEmployeeComponent,
    SearchEmployeeTypeComponent,
    SearchWageRateComponent,
    SearchWarningComponent,
    SearchWarningTypeComponent,
    MaintainEmployeeComponent,
    MaintainEmployeeTypeComponent,
    MaintainWageRateComponent,
    MaintainWarningComponent,
    MaintainWarningTypeComponent,
    UpdateEmployeeComponent,
    UpdateEmployeeTypeComponent,
    UpdateWageRateComponent,
    UpdateWarningComponent,
    UpdateWarningTypeComponent,
    AddSupplierComponent,
    SearchSupplierComponent,
    MaintainSupplierComponent,
    MaintainProductComponent,
    SearchProductComponent,
    AddProductComponent,
    AddDebtorComponent,
    SearchDebtorComponent,
    MaintainDebtorComponent,
    UpdateDebtorComponent,
    UpdateSupplierComponent,
    LoginComponent,
    AddProductCategoryComponent,
    AddProductTypeComponent,
    SearchProductCategoryComponent,
    SearchProductTypeComponent,
    MaintainProductTypeComponent,
    MaintainProductCategoryComponent,
    UpdateProductCategoryComponent,
    UpdateProductComponent,
    UpdateProductTypeComponent,
    CreateSupplierOrderComponent,
    ReceiveSupplierOrderComponent,
    ReorderListComponent,
    ReturnSupplierOrderComponent,
    SearchSupplierOrderComponent,
    CompleteStocktakeComponent,
    WriteOffComponent,
    SupplierOrderComponent,
    ReceiveOrderComponent,
    ReturnOrderComponent,
    ApplyForCreditComponent,
    ApproveCreditComponent,
    ViewDebtorAccountComponent,
    ViewCreditAccountComponent,
    ViewApprovedAccountsComponent,
    MakeSaleComponent,
    SearchSaleComponent,
    ViewSaleComponent,
    CapturePaymentComponent,
    SalesReportComponent,
    DebtorsReportComponent,
    WageReportComponent,
    StockReportComponent,
    CalculateWagesComponent,
    CollectPayslipComponent,
    AuditLogComponent,
    EmployeePageComponent,
    SupplierPageComponent,
    ProductPageComponent,
    DebtorPageComponent,
    SalePageComponent,
    ReportsPageComponent,
    AuditLogPageComponent,
    ValidationServicesComponent,
    NavEmployeeComponent,
    NavGeneralManagerComponent,
    NavCashierComponent,
    NavHRComponent,
    EmployeeLandingPageComponent,
    ClockInAndOutComponent,
    ForgotResetPasswordComponent,
    LogoutTimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPrintModule,
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
