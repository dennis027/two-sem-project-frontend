
import { Component, HostListener, OnInit, ViewChild, TemplateRef, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service'
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {NgxLoaderService} from '@binssoft/ngx-loader'
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('successDialog') successDialog!: TemplateRef<any>;
  loader:boolean = false
  // @ViewChild('formPrimary') form11!:NgForm //form primary data declaration
  hide = true;
  title = 'toaster-not';
  form:any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  //CAPS LOCK DETECT
  public isCaps: boolean = false;

  @HostListener('window:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    this.isCaps = typeof event.getModifierState === 'function' && event.getModifierState('CapsLock');
  }

  //END

  loaderConfig:any ={
    theme:{
      back:'rgb(181 24 51 / 0.5)',
      spinner:'#184db5' 
    },
    type:'ring', //bar, ring, bubble-spinner, square, bounce,cube
}

animal!: string;
name!: string;




  constructor(private authService: AuthService,
               private router: Router,
                private tokenStorage: TokenStorageService,
                private toastr: ToastrService,
                private loaderService: NgxLoaderService,
                private http : HttpClient,
                public dialog: MatDialog) { 
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
    this.loader=true
    this.authService.login(this.form).subscribe((res: any) => {
      this.loader=false
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
      this.loader=false
      this.toastr.error('Kindly provide the correct credentials');
    })
   
  }

  reloadPage(): void {
    window.location.reload();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.openSuccessDialog()
      this.animal = result;
    });
  
  }

  openSuccessDialog() {
    let dialogRef = this.dialog.open(this.successDialog);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
                // TODO: Replace the following line with your code.
                console.log('User clicked yes.');
            } else if (result === 'no') {
                // TODO: Replace the following line with your code.
                console.log('User clicked no.');
            }
        }
    })
}
}