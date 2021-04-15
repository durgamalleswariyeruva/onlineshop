import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  username;
  username1;
  products = [];
  searchTerm;
  userCartSize = 0;
  token;
  userid;
  constructor(private rt: Router, private us: UserService, private ts: ToastrService){}
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.userid = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this.cartStatus();
  }
  onRegister(): any{
    this.rt.navigateByUrl('/home');
   }
  getAllProducts(): any{
   this.us.getProducts().subscribe(
    res => {
      this.products = res.message;
    },
    err => {
      this.ts.warning('Something went wrong in getting all products');
      console.log(err);
    }
  );
}
viewitem(i): any{
  this.rt.navigateByUrl('/home');
}
additem(i): any{
  this.rt.navigateByUrl('/home');
}

logout(): any {
  localStorage.clear();
  this.rt.navigateByUrl('/home')
            .then(() => {
              window.location.reload();
            });
 }
 placeorder(): any {
  this.rt.navigateByUrl('/placeorder')
  .then(() => {
    window.location.reload();
  });

 }
 usercart(): any {
   this.rt.navigateByUrl('/usercart')
   .then(() => {
    window.location.reload();
  });

 }
 wishlist(): any {
   this.rt.navigateByUrl('users/wishlist')
   .then(() => {
    window.location.reload();
  });
 }
 cart(): any {
   this.rt.navigateByUrl('users/usercart');
 }
 cartStatus(): any{
  this.us.getCartSize(this.userid).subscribe(
    res => {
      this.us.setCartSubjectSize(res.cartsize);
      this.userCartSize = res.cartsize;
      this.us.getCartSubjectSize().subscribe(c => {
      this.userCartSize = c;
      });
    },
    err => {
      this.ts.warning('Something went wrong in getting all products');
      console.log(err);
    }
  );

}

}
