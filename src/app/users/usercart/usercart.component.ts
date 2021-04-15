import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  userid;
  username;
  cart;
  check = [];
  unavail = [];
  products = [];
  amount;
  carts = [];
  productname = [];
  costs;
  spinning = 0;
  constructor(private us: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');


    this.getCart();
    this.totalamount();
  }

  logout(): any {
    this.router.navigateByUrl('/home');
  }
  getCart(): any {

    this.us.getCartItems(this.userid).subscribe(
      res => {
        if (res.message === 'success') {
          this.spinning = 1;
          this.cart = res.product;
          this.productname = res.product1;
          for (const i in this.cart) {
            if (this.cart.hasOwnProperty(i)) {
              for (const j in this.productname) {
                if (this.cart[i].productname === this.productname[j].pname) {
                  this.check.push(this.cart[i]);
                }
              }
            }
          }
          this.unavail = this.cart.filter((item: any) => this.check.indexOf(item) < 0);
          this.totalamount();
        }
        else {
          this.toastr.warning(res.message);
          this.router.navigateByUrl('/login');
        }
      },
      err => {
        this.toastr.warning('Something went wrong in adding Products');
        console.log(err);
      }
    );
  }

  delete(n: number): any {
    const obj4 = this.check[n];
    this.us.deleteCartProduct(obj4).subscribe(
      res => {
        if (res.message) {
          this.toastr.success('product removed from usercart');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      },
      err => {
        this.toastr.warning('Something went wrong in user creation');
        console.log(err);
      }
    );
  }
  goTo(): any {
    this.router.navigateByUrl('/home');
  }
  additem(n: number): any {
    if (this.userid) {
      const obj = {
        userid: this.userid,
        productname: this.check[n].productname,
        colour: this.check[n].colour,
        cost: this.check[n].cost,
        productImgLink: this.check[n].productImgLink,
        quantity: this.check[n].quantity
      };
      this.us.placeOrder(obj).subscribe(
        res => {
          if (res.message === 'product exist') {
            this.toastr.warning('product is already added to placeOrder');
          }
          else {
            this.toastr.success('Product added to placeOrder');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        },
        err => {
          this.toastr.warning('Something went wrong in adding order');
          console.log(err);
        }
      );
      this.us.deleteOrder1(obj).subscribe(
        res => {
          if (res.message) {
            // this.ts.success("successfully deleted product from usercart");
          }
        },
        err => {
          this.toastr.warning('Something went wrong in order deletion');
          console.log(err);
        }
      );
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
  incr(p): any {
    if (p.quantity) {
      const cost = p.cost / p.quantity;
      p.quantity += 1;
      p.cost = p.quantity * cost;
    }
    this.totalamount();
  }
  decr(p): any {
    if (p.quantity !== 1) {
      const cost = p.cost / p.quantity;
      p.quantity -= 1;
      p.cost = p.quantity * cost;
      this.totalamount();
    }
  }
  totalamount(): any {
    this.amount = 0;
    this.costs = 0;
    for (const i of this.cart) {
      const cost = i.cost / i.quantity;
      this.amount += cost * i.quantity;
    }
    for (const i of this.unavail) {
      this.costs = this.costs + this.unavail[i].cost;
    }
    this.amount = this.amount - this.costs;
  }
}
