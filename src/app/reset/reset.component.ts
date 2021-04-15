import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
   status = false;
   formRef: FormGroup = new FormGroup({});
  submitted = false;
  constructor( private us: UserService, private router: Router, private ts: ToastrService) { }

  ngOnInit(): void {
    this.formRef = new FormGroup({
      userid: new FormControl(null, Validators.required),
      password1: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),

    });
  }
  getControls(): any{
    return this.formRef.controls;
  }
  back(): any{
    this.router.navigateByUrl('/login');
  }
  onSubmit(): any {
    this.submitted = true;
    if (this.formRef.valid)
     {
       const obj = this.formRef.value;
       if (obj.password1 === obj.password2) {
           this.us.changePassword(obj).subscribe(
             res => {
               if (res.message === 'nouser') {
                 this.ts.warning('userid is invalid');
               }
               if (res.message === 'success') {
                 this.ts.success('Reset Password is successfull');
                 this.router.navigateByUrl('/login');
               }
             },
             err => {
               this.ts.warning('something went wrong in reset password');
               console.log(err);
             });
    }
    else{
      this.status = true;
    }
  }
  }
}
