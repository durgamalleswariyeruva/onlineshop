import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from '../app.module';
import { RouteGuard } from '../route.guard';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsersComponent } from './users.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [{ path: '', component: UsersComponent},
  {path: 'usercart', component: UsercartComponent, canActivate: [RouteGuard]},
  {path: 'userdashboard', component: UserdashboardComponent, canActivate: [RouteGuard]},
  {path: 'viewcart', component: ViewcartComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [RouteGuard]},
  {path: 'placeorder', component: PlaceorderComponent, canActivate: [RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
