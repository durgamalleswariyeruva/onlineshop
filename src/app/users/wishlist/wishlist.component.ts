import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private us: UserService, private router: Router, private ts: ToastrService) { }
  userid;
  username;
  products = [];
  userCartSize = 0;
  spinning = 0;
  ngOnInit(): void {
    this.userid = localStorage.getItem('userid') ;
    this.getwishlist();
    this.cartStatus();
  }
  goTo(): any {
    this.router.navigateByUrl('/home');
  }
  getwishlist(): any {
    this.us.getwishlist(this.userid).subscribe(
      res => {

        if (res.message === 'success')
         {
           this.products = res.productList;
           this.spinning = 1;

        }

        else{
          this.ts.warning(res.message);
          this.router.navigateByUrl('/login');
        }
      }
    );
  }
  cartStatus(): any {
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
  back(): any{
    this.router.navigateByUrl('/home');
  }
  deleteList(n): any {
    const obj = this.products[n];
    this.us.deleteWishProduct(obj).subscribe(
      res => {
        if (res.message) {
          this.ts.success('Product removed from wishing cart');
          window.location.reload();
        }}
        );
      }
  additems(n: number): any {
    if (this.userid) {
      const obj = {
      userid: this.userid,
      productname: this.products[n].productname,
      colour: this.products[n].colour,
      cost: this.products[n].cost,
      quantity: this.products[n].quantity,
      rate: this.products[n].rate,
      description: this.products[n].description,
      productImgLink: this.products[n].productImgLink
      };
      this.us.usercart(obj).subscribe(
        res => {
          if (res.message === 'product exist') {
            this.ts.warning('Product is already added to cart');
          }
          else {
            this.ts.success('Product added to cart');
            this.cartStatus();
          }
        },
        err => {
          this.ts.warning('Something went wrong in Adding product to cart');
          console.log(err);
        }
      );
    }
    else {
      this.ts.warning('please login first to add items to wishcart');
      this.router.navigateByUrl('/login');
    }
  }
}
