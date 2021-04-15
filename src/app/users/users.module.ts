import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationService } from '../authorization.service';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';


@NgModule({
  declarations: [UsersComponent, UsercartComponent, UserdashboardComponent, ViewcartComponent, WishlistComponent, PlaceorderComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationService,
      multi: true  },
  ]
})
export class UsersModule { }
