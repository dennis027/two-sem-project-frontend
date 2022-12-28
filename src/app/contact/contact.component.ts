
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder,FormGroup,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ContactService } from '../services/contact.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
 form:any = {
   name:null,
   email:null,
   subject:null,
   message:null
 }
  constructor(private contactService:ContactService,
              private router:Router,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
  }
  onSubmit(): void{
    let {name,email,subject,message}= this.form;
    this.contactService.postContact(name,email,subject,message).subscribe(
      (data) => {
        console.log(data)
        this.toastr.success('Sober Space Received Your Message');
      this.router.navigate (['contact'])
       
      },
      (err) => {
       console.log(err)
       this.toastr.error('Check Your Details ');
      });
      // );
      // this.dialogRef.close();
  }
}
