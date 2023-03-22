
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ContactService } from '../../../services/contact.service';

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
  @ViewChild('f') form!:NgForm
  loader:boolean=false
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
 data:any = {
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
    this.loader=true
    let {name,email,subject,message}= this.data;
    this.contactService.postContact(name,email,subject,message).subscribe(
      (data) => {
    
        this.loader=false
      
        console.log(data)
        this.toastr.success('Sober Space Received Your Message');
        this.form.resetForm({})
 
     
      },
      (err) => {
        this.loader=false
       console.log(err)
       this.toastr.error('Check Your Details ');
    
      });
      // );
      // this.dialogRef.close();
  }
}
