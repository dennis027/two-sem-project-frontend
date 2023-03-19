import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NgForm, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  token!:string
  passwordToken:any
  @ViewChild('f') form!:NgForm
  userForm ={
    token:'',
    password:''
  }
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  resetPasswordForm = this.formBuilder.group(
    {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );

  constructor(private route: ActivatedRoute,
              private userService:UsersService,
              private formBuilder: FormBuilder,
              private router : Router,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
       
        this.passwordToken=params['token']
      console.log(this.passwordToken)
      }
    );
  
  }

  resetPassword(){
    const data = {
      token:this.passwordToken,
      password:this.userForm.password
    }
    this.userService.resetPassword(data).subscribe(
      
      (data)=>{
        console.log(data)
        this.router.navigate(['login']);
        this.toastr.success('Password Changes Successfully')
      },
      (err)=>{
        console.log(err)
        this.toastr.error('Kindly check your new password')
      }
    )

      
    
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  onSubmit(){

  }

}
