import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute,private userService:UsersService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
       
        this.passwordToken=params['token']
      console.log(this.passwordToken)
      }
    );
  
  }

  resetPassword(){
    this.userService.resetPassword(this.userForm).subscribe(
      (data)=>{
        console.log(data)
      },
      (err)=>{
        console.log(err)
      }
    )

      
    
  }

}
