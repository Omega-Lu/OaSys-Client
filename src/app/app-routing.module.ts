import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MakeSaleComponent } from './nav/make-sale/make-sale.component';
import { SearchSaleComponent } from './nav/search-sale/search-sale.component';


const routes: Routes = [
  {path: 'nav', component: NavComponent},
  {path: 'makeSale', component: MakeSaleComponent },
  {path: 'searchSale', component: SearchSaleComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), TooltipModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule { }
