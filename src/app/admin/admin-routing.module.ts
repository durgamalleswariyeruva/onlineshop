import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../route.guard';
import { AdminComponent } from './admin.component';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';
import { ViewadminproductsComponent } from './viewadminproducts/viewadminproducts.component';

const routes: Routes = [{ path: '', component: AdminComponent , canActivate : [RouteGuard] },
{ path: 'viewadminproducts', component: ViewadminproductsComponent, canActivate : [RouteGuard],
 },
 {path: 'updatedetails', component: UpdatedetailsComponent, canActivate : [ RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
