import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  loadEmail:boolean=false

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  @ViewChild('f') form!:NgForm
   userForm ={
    email:''
   }
  constructor(private userService:UsersService,
        public dialogRef: MatDialogRef<ForgetPasswordComponent>,) { }

  ngOnInit(): void {

  }
  resetFunction(){
    console.log('hahahah')
    this.loadEmail=true
    this.userService.forgetPassword(this.userForm).subscribe(
      (data)=>{
        console.log(data)
        this.form.resetForm({})
        this.loadEmail=false
        this.onNoClick()
      },
      (err)=>{
        console.log(err)
        this.loadEmail=false
      }
    )

      
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
