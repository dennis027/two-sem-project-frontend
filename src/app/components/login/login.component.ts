
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service'
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {NgxLoaderService} from '@binssoft/ngx-loader'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'toaster-not';
  form:any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  loaderConfig:any ={
    theme:{
      back:'rgb(181 24 51 / 0.5)',
      spinner:'#184db5' 
    },
    type:'ring', //bar, ring, bubble-spinner, square, bounce,cube
}


  constructor(private authService: AuthService, private router: Router,
    private tokenStorage: TokenStorageService,private toastr: ToastrService,private loaderService: NgxLoaderService,  private http : HttpClient) { 
      this.loaderService.skipMap([
        'albums'
      ]);
      this.http.get('https://example.com/comments').subscribe((res:any)=>{})
      this.http.get('https://example.com/albums').subscribe((res:any)=>{})

    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.form = {
      username: '',
      password: '',
    } 
  }
  onSubmit() {
    this.authService.login(this.form).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('accessToken', res['token'])
      localStorage.setItem('username', res['username'])
      localStorage.setItem('user_id', res['user_id'])
      localStorage.setItem('role', res['role'])
    
     
  
      if ((res['role']) === "is_admin") {
        this.router.navigate(['admin']);
      }
      else if ((res['role'])== "is_professional"){
        this.router.navigate (['professional'])
      }
      else{
        this.router.navigate(['patient']);
      }
      this.toastr.success('Logged in successfully.Welcome to Sober Space.');

    }, error => {
      this.toastr.error('Kindly provide the correct credentials');
    })
   
  }

  reloadPage(): void {
    window.location.reload();
  }
}