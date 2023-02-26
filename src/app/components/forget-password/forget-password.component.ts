import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('f') form!:NgForm
   userForm ={
    email:''
   }
  constructor(private userService:UsersService) { }

  ngOnInit(): void {

  }
  resetFunction(){
    
    this.userService.forgetPassword(this.userForm).subscribe(
      (data)=>{
        console.log(data)
      },
      (err)=>{
        console.log(err)
      }
    )

      
    
  }

}
