import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder,FormGroup,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  Roles: any = ['Admin', 'Partner', 'Volunteer'];
  hide = true;
  form: any = {
    username: null,
    email: null,
    phone: 0,
    password: null,
    role: 'is_addict',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    let { username, email, phone, is_admin, is_partner, is_volunteer, role, password } =
      this.form;
      console.log(this.form)

    this.authService.register(username, email, phone, role="is_addict", password).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
        console.log(this.form)
        this.toastr.success('Sign-Up Successfully');
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.toastr.error('Kindly Check details provided');
      } 
    );
  }
} 