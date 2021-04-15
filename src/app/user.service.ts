import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCartSize;
  cartsize = 0;
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);

  constructor(private hc: HttpClient) { }

  // user registration
  createUser(userObj): Observable<any> {
    return this.hc.post('/user/registration', userObj);
  }

  loginUser(userCredObj): Observable<any> {
    return this.hc.post('/user/login', userCredObj);
  }
  changePassword(obj): Observable<any> {
    return this.hc.post('/user/resetpassword', obj);
  }
  userscount(): Observable<any> {
    return this.hc.get('user/userscount');
  }

  usercart(obj): Observable<any> {
    return this.hc.post('user/addtocart', obj);
  }
  wishList(obj): Observable<any> {
    return this.hc.post('user/wishlist', obj);
  }
  getwishlist(userid): Observable<any> {
    return this.hc.get('user/getWishlist/' + userid);
  }
  getProducts(): Observable<any> {
    return this.hc.get('/admin/allproducts');
  }
  deleteWishProduct(obj): Observable<any> {
    return this.hc.post('/user/deletewishproduct', obj);
  }
  viewItem(pCategory): Observable<any> {
    return this.hc.post('/admin/viewitem', pCategory);
  }
  getItem(pCategory): Observable<any> {
    return this.hc.get('/admin/oneproduct/' + pCategory);
  }
  getProduct(pname): Observable<any> {
    return this.hc.get('/admin/getitem/' + pname);
  }
  getInitialCartSize(userid): any {
    return this.hc.get('/user/getsize/' + userid);
  }
  getCartSubjectSize(): Observable<any> {
    return this.cartSubject.asObservable();
  }
  setCartSubjectSize(cartsize): any {
    this.cartSubject.next(cartsize);
  }
  getCartSize(userid): Observable<any> {
    return this.hc.get('/user/getsize/' + userid);
  }
  getCartItems(userid): Observable<any> {
    return this.hc.get('/user/getcartitems/' + userid);
  }
  deleteCartProduct(obj4): Observable<any> {
    return this.hc.post('/user/deleteproduct', obj4);
  }
  placeOrder(obj): Observable<any> {
    return this.hc.post('/user/orders', obj);
  }
  getOrderItems(userid): Observable<any> {
    return this.hc.get('/user/getOrderitem/' + userid);
  }
  deleteOrderProduct(obj5): Observable<any> {
    return this.hc.post('/user/deleteOrder', obj5);
  }
  deleteOrder1(obj): Observable<any> {
    return this.hc.post('/user/deleteOrder1', obj);
  }
}
