import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status;
  s1;
  userCredObj;
  username;
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  constructor(private rt: Router, private us: UserService, private ts: ToastrService) { }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userid: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  register(): any {
    this.rt.navigateByUrl('/register');
  }
  getControls(): any {
    return this.registerForm.controls;
  }
  forgot(): any {
    this.rt.navigateByUrl('/reset');
  }
  onSubmit(): any {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.userCredObj = this.registerForm.value;
      this.us.loginUser(this.userCredObj).subscribe(
        res => {
          if (res.message === 'success') {
            // store token and username in local storage
            localStorage.setItem('token', res.signedToken);
            localStorage.setItem('userid', res.userid);
            localStorage.setItem('username', res.username);
            // navigate to user component
            this.ts.success('Login Successfful');
            this.rt.navigateByUrl('/home')
              .then(() => {
                window.location.reload();
              });
          }
          else if (res.message === 'admin login') {
            // store token and username in local storage
            localStorage.setItem('token', res.signedToken);
            localStorage.setItem('userid', res.userid);
            localStorage.setItem('username', res.username);
            this.ts.success('Admin Login Successfful');
            this.rt.navigateByUrl('/admindashboard')
              .then(() => {
                window.location.reload();
              });
          }
          else {
            if (res.message === 'Invalid username') {
              this.ts.warning('Invalid Username');
            }
            if (res.message === 'Invalid password') {
              this.ts.warning('Invalid Password');
            }
          }
        },
        err => {
          this.ts.warning('Something went wrong in user login');
          console.log(err);
        }
      );
    }
  }
}
