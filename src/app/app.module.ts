import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEployeeComponent } from './nav/add-eployee/add-eployee.component';
import { AddEployeeTypeComponent } from './nav/add-eployee-type/add-eployee-type.component';
import { AddWageRateComponent } from './nav/add-wage-rate/add-wage-rate.component';
import { AddWarningComponent } from './nav/add-warning/add-warning.component';
import { AddWarningTypeComponent } from './nav/add-warning-type/add-warning-type.component';
import { SearchEmployeeComponent } from './nav/search-employee/search-employee.component';
import { SearchEmployeeTypeComponent } from './nav/search-employee-type/search-employee-type.component';
import { SearchWageRateComponent } from './nav/search-wage-rate/search-wage-rate.component';
import { SearchWarningComponent } from './nav/search-warning/search-warning.component';
import { SearchWarningTypeComponent } from './nav/search-warning-type/search-warning-type.component';
import { MaintainEmployeeComponent } from './nav/maintain-employee/maintain-employee.component';
import { MaintainEmployeeTypeComponent } from './nav/maintain-employee-type/maintain-employee-type.component';
import { MaintainWageRateComponent } from './nav/maintain-wage-rate/maintain-wage-rate.component';
import { MaintainWarningComponent } from './nav/maintain-warning/maintain-warning.component';
import { MaintainWarningTypeComponent } from './nav/maintain-warning-type/maintain-warning-type.component';
import { UpdateEmployeeComponent } from './nav/maintain-employee/update-employee/update-employee.component';
import { UpdateEmployeeTypeComponent } from './nav/maintain-employee-type/update-employee-type/update-employee-type.component';
import { UpdateWageRateComponent } from './nav/maintain-wage-rate/update-wage-rate/update-wage-rate.component';
import { UpdateWarningComponent } from './nav/maintain-warning/update-warning/update-warning.component';
import { UpdateWarningTypeComponent } from './nav/maintain-warning-type/update-warning-type/update-warning-type.component';
import { AddSupplierComponent } from './nav/add-supplier/add-supplier.component';
import { SearchSupplierComponent } from './nav/search-supplier/search-supplier.component';
import { MaintainSupplierComponent } from './nav/maintain-supplier/maintain-supplier.component';
import { MaintainProductComponent } from './nav/maintain-product/maintain-product.component';
import { SearchProductComponent } from './nav/search-product/search-product.component';
import { AddProductComponent } from './nav/add-product/add-product.component';
import { AddDebtorComponent } from './nav/add-debtor/add-debtor.component';
import { SearchDebtorComponent } from './nav/search-debtor/search-debtor.component';
import { MaintainDebtorComponent } from './nav/maintain-debtor/maintain-debtor.component';
import { UpdateDebtorComponent } from './nav/maintain-debtor/update-debtor/update-debtor.component';
import { UpdateSupplierComponent } from './nav/maintain-supplier/update-supplier/update-supplier.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductCategoryComponent } from './nav/add-product-category/add-product-category.component';
import { AddProductTypeComponent } from './nav/add-product-type/add-product-type.component';
import { SearchProductCategoryComponent } from './nav/search-product-category/search-product-category.component';
import { SearchProductTypeComponent } from './nav/search-product-type/search-product-type.component';
import { MaintainProductTypeComponent } from './nav/maintain-product-type/maintain-product-type.component';
import { MaintainProductCategoryComponent } from './nav/maintain-product-category/maintain-product-category.component';
import { UpdateProductCategoryComponent } from './nav/maintain-product-category/update-product-category/update-product-category.component';
import { UpdateProductComponent } from './nav/maintain-product/update-product/update-product.component';
import { UpdateProductTypeComponent } from './nav/maintain-product-type/update-product-type/update-product-type.component';
import { CreateSupplierOrderComponent } from './nav/create-supplier-order/create-supplier-order.component';
import { ReceiveSupplierOrderComponent } from './nav/receive-supplier-order/receive-supplier-order.component';
import { ReorderListComponent } from './nav/reorder-list/reorder-list.component';
import { ReturnSupplierOrderComponent } from './nav/return-supplier-order/return-supplier-order.component';
import { SearchSupplierOrderComponent } from './nav/search-supplier-order/search-supplier-order.component';
import { CompleteStocktakeComponent } from './nav/complete-stocktake/complete-stocktake.component';
import { WriteOffComponent } from './nav/write-off/write-off.component';
import { ApplyForCreditComponent } from './nav/apply-for-credit/apply-for-credit.component';
import { ViewDebtorsAccountComponent } from './nav/view-debtors-account/view-debtors-account.component';
import { ApproveCreditComponent } from './nav/credit-application/approve-credit/approve-credit.component';
import { CreditApplicationComponent } from './nav/credit-application/credit-application.component';
import { SearchSaleComponent } from './nav/search-sale/search-sale.component';
import { ViewSaleComponent } from './nav/search-sale/view-sale/view-sale.component';
import { MakeSaleComponent } from './nav/make-sale/make-sale.component';
import { MatFormField } from '@angular/material/form-field';

const appRoutes: Routes = [
  {path: "nav", component: NavComponent}
]

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
    ApplyForCreditComponent,
    ViewDebtorsAccountComponent,
    ApproveCreditComponent,
    CreditApplicationComponent,
    SearchSaleComponent,
    ViewSaleComponent,
    MakeSaleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
