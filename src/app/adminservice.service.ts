import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private hc: HttpClient) { }
  createproduct(proObj): Observable<any> {
    return this.hc.post('/admin/productdetails', proObj);
  }
  getlist(): Observable<any> {
    return this.hc.get('/admin/allproducts');
  }
  deleteProduct(obj): Observable<any> {
    return this.hc.post('/admin/delete', obj);
  }
  getcurrentdata(pname): Observable<any> {
    return this.hc.get('/admin/getproductdata/' + pname);
  }
  editproduct(obj): Observable<any> {
    return this.hc.put('/admin/updateproduct', obj);
  }
}
