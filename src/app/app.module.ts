import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
