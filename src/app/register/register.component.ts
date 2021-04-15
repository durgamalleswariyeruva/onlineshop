import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
userObj;
registerForm: FormGroup = new FormGroup({});
  submitted = false;
  length;
  userid;
  id;
constructor(private rt: Router, private us: UserService, private ts: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userid: new FormControl('OSIN2021' + (Math.floor(Math.random() * 501)), Validators.required),
      username: new FormControl(null, Validators.required),
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),
    });
  }
  users(): any {
    this.us.userscount().subscribe(
      res => {
        this.length = res.message;
      },
      err => {
        this.ts.warning('Something went wrong in user length');
        console.log(err);
      } );
  }
  onLogin(): any {
    this.rt.navigateByUrl('/login');
  }
  getControls(): any {
    return this.registerForm.controls;
  }
  onSubmit(): any {
    this.submitted = true;
    if (this.registerForm.valid)
     {
       this.userObj = this.registerForm.value;
       this.id = this.userObj.userid;
       this.us.createUser(this.userObj).subscribe(
       res => {
        if (res.message === 'user existed'){
          this.ts.warning('userid is already existed..choose another');
        }},
      err => {
        this.ts.warning('Something went wrong in user creation');
        console.log(err);
      }  );
  }
}
}
