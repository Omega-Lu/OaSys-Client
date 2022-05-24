import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const routes: Routes = [
  {path: 'nav', component: NavComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), TooltipModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule { }
