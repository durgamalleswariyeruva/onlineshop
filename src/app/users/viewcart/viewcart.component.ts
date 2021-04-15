import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  userid ;
  userCartSize ;
  pname ;
  product ;
  spinning = 0 ;
  constructor(private us: UserService, private router: Router, private ts: ToastrService) { }
  ngOnInit(): void {
    this.userid = localStorage.getItem('userid') ;
    this.pname = localStorage.getItem('pname') ;
    this.getProduct() ;
  }
  back(): any {
    this.router.navigateByUrl('/home') ;
  }
  getProduct(): any {
    this.us.getProduct(this.pname).subscribe(
      res => {
        this.spinning = 1 ;
        this.product = res.message ;
      } ,
      err => {
        this.ts.warning('Something went wrong in getting all products') ;
        console.log(err) ;
      }
    );
  }
  cartStatus(): any {
    this.us.getCartSize(this.userid).subscribe(
      res => {
        this.us.setCartSubjectSize(res.cartsize) ;
        this.userCartSize = res.cartsize ;
        this.us.getCartSubjectSize().subscribe(c => {
        this.userCartSize = c;
        });
      },
      err => {
        this.ts.warning('Something went wrong in getting all products') ;
        console.log(err) ;
      }
    );

  }
  additem(i): any {
    if (this.userid) {
      const obj = {
      userid: this.userid ,
      productname: this.product[i].pname ,
      colour: this.product[i].pcol ,
      cost: this.product[i].pprice ,
      quantity: this.product[i].pquantity ,
      rate: this.product[i].prating ,
      description: this.product[i].pdescription ,
      productImgLink: this.product[i].ImgLink
      };
      this.us.usercart(obj).subscribe(
        res => {
          if (res.message === 'product exist') {
            this.ts.warning('Product is already added to cart') ;
          }
          else {
            this.ts.success('Product added to cart') ;
            this.cartStatus() ;
          }
        },
        err => {
          this.ts.warning('Something went wrong in Adding cart') ;
          console.log(err) ;
        }
      );
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}

