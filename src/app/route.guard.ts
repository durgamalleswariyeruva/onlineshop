import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private ts: ToastrService, private rs: Router) { }
  canActivate(): boolean {
    // check token in local storage
    const token = localStorage.getItem('token');
    // if token is not found , return true
    if (token == undefined) {
      this.ts.warning('unauthorized access,Please login to continue');
      this.rs.navigateByUrl('/login').then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
      return false;
    }
    // else return true
    return true;
  }

}
