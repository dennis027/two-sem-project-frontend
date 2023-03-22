import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import {AfterViewInit,  ViewChild,TemplateRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SendMailService } from 'src/app/services/send-mail.service';
export interface usersObject {
  username:string;
  email:string;
  phone:string;

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit , OnDestroy {
  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  @ViewChild('sendEmailDialog') sendEmailDialog!: TemplateRef<any>;
  @ViewChild('adminDialog') adminDialog!: TemplateRef<any>;
  @ViewChild('professionalDialog') professionalDialog!: TemplateRef<any>;
  @ViewChild('addictsDialog') addictsDialog!: TemplateRef<any>;
  @ViewChild('deleteAccountDialog') deleteAccountDialog!: TemplateRef<any>;
  @ViewChild('sendAllEmailDialog') sendAllEmailDialog!: TemplateRef<any>;
  @ViewChild('sendAllAddictEmailDialog') sendAllAddictEmailDialog!: TemplateRef<any>;
  @ViewChild('sendAllProfEmailDialog') sendAllProfEmailDialog!: TemplateRef<any>;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  public isCaps: boolean = false;

  @HostListener('window:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    this.isCaps = typeof event.getModifierState === 'function' && event.getModifierState('CapsLock');
  }
  userData:any={
    username:null,
    email:null,
    phone:null,
    role:null,
    password:null
  }
  allEmails:any
  userProf:any={
    username:null,
    email:null,
    phone:null,
    role:null,
    password:null
  }
    send_mail:any = {
    subject:'',
    message:'',
    from_email:environment.emailAddress,
    recipient_list:[]
  }
  userAdd:any={
    username:null,
    email:null,
    phone:null,
    role:null,
    password:null
  }
  loader:boolean=false
  thisEmail:any
  userMail:any
  currentEmail:any
  success:any
  failed:any
  addictsEmails:any
  profEmails:any
  @ViewChild('f') form!:NgForm
  users:any
  usrname:any
  hide = true;
  hide1=true
  // admin:any
  // professional:any
  // addicts:any
  constructor(
    private usersService:UsersService
    ,private toastr: ToastrService,
    private dialog: MatDialog,
    private emailService:SendMailService) { }


 addicts: usersObject[] = [    ];
  displayedColumns: string[] = ['username', 'email', 'phone','actions'];
  dataSource = new MatTableDataSource([...this.addicts]);

  professional: usersObject[] = [    ];
  displayedColumns1: string[] = ['username', 'email', 'phone','actions'];
  dataSource1 = new MatTableDataSource([...this.professional]);

  admin: usersObject[] = [    ];
  displayedColumns2: string[] = ['username', 'email', 'phone','actions'];
  dataSource2 = new MatTableDataSource([...this.admin]);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  ngOnInit(): void {

    this.subscription = this.everyFiveSeconds.subscribe(() => {
  

    this.dataSource.sort = this.sort;
    this.usersService.getUsers().subscribe((res:any[])=>{
      this.users=res
      // console.log(this.users)

      this.admin = this.users.filter((users:any) => users.role === "is_admin")
      // console.log(this.admin)

      this.professional = this.users.filter((users:any) => users.role === "is_professional")
      // console.log(this.professional)

      this.addicts = this.users.filter((users:any) => users.role === "is_addict")
      // console.log(this.addicts)
    })
   
  });
  }

  onSubmitAdmin(){
    const userData = {
      username:this.userData.username,
      email:this.userData.email,
      phone:this.userData.phone,
      role:'is_admin',
      password:this.userData.password
    }

    this.usersService.addUser(userData).subscribe(
      (data)=>{
          
        // console.log(data)
        this.toastr.success('Admin Added Successfully');
        this.form.resetForm({})
        this.dialog.closeAll()
      },
      (err)=>{
        // console.log(err)
        this.toastr.error('Check Your Details ');
      }
    )
  }
  
  onSubmitProfessional(){
    const userProf = {
      username:this.userProf.username,
      email:this.userProf.email,
      phone:this.userProf.phone,
      role:'is_professional',
      password:this.userProf.password
    }

    this.usersService.addUser(userProf).subscribe(
      (data)=>{
          
        // console.log(data)
        this.toastr.success('Professional Added Successfully');
        this.form.resetForm({})
        this.dialog.closeAll()
      },
      (err)=>{
        // console.log(err)
        this.toastr.error('Check Your Details ');
      }
    )
  }

  onSubmitAddict(){
    const userAdd = {
      username:this.userAdd.username,
      email:this.userAdd.email,
      phone:this.userAdd.phone,
      role:'is_addict',
      password:this.userAdd.password
    }

    this.usersService.addUser(userAdd).subscribe(
      (data)=>{
          
        // console.log(data)
        this.toastr.success('Addict Added Successfully');
        this.form.resetForm({})
        this.dialog.closeAll()
      },
      (err)=>{
        // console.log(err)
        this.toastr.error('Check Your Details ');
      }
    )
  }


  callAddict(){
    let dialogRef = this.dialog.open(this.addictsDialog);
    dialogRef.afterClosed().subscribe(result => {

        if (result !== undefined) {
            if (result === 'yes') {
             
    
            } else if (result === 'no') {
             
            }
        }
    })
  }
  callProfessional(){
    let dialogRef = this.dialog.open(this.professionalDialog);
    dialogRef.afterClosed().subscribe(result => {

        if (result !== undefined) {
            if (result === 'yes') {
             
    
            } else if (result === 'no') {
             
            }
        }
    })
  }




  callAdmin(){
    let dialogRef = this.dialog.open(this.adminDialog);
    dialogRef.afterClosed().subscribe(result => {

        if (result !== undefined) {
            if (result === 'yes') {
 
            } else if (result === 'no') {
   
            }
        }
    })
  }


  deleteUser(id:any) {
    let dialogRef = this.dialog.open(this.deleteAccountDialog);
    let currentData = this.users.find((p: { id: any; }) =>{return p.id ===  id});
   this.usrname=currentData.username
    dialogRef.afterClosed().subscribe(result => {

        if (result !== undefined) {
            if (result === 'yes') {
              this.usersService.deleteUser(id).subscribe(
 
              );
            } else if (result === 'no') {
      
         
            }
        }
    })
}
getEmail(id:any){
  console.log(id)
  let currentRole =  this.users.find((p: { id: any; }) =>{return p.id ===  id});
  console.log(currentRole)
  console.log(typeof(currentRole?.email))
  this.thisEmail= currentRole?.email
  this.userMail=currentRole?.name
  this.currentEmail = new Array(); 
  length = this.currentEmail.push(this.thisEmail); 
  console.log("new email is : " + this.currentEmail );

}
sendMail(){
  this.loader=true
  const data ={
    subject:this.send_mail.subject,
    message:this.send_mail.message,
    from_email:this.send_mail.from_email,
    recipient_list:this.currentEmail
  }
  this.emailService.sendEmailContacts(data).subscribe(
    (res)=>{
      this.loader=false
      this.success=res
      this.toastr.success(this.success.message)
      this.send_mail.subject='',
      this.send_mail.message=''
      this.dialog.closeAll()
    },
    (err)=>{
      this.loader=false
      this.failed=err
      this.toastr.error(this.failed.error.message)
   
      
    }
  )
}
sendAllMail(){
  this.loader=true
  const data ={
    subject:this.send_mail.subject,
    message:this.send_mail.message,
    from_email:this.send_mail.from_email,
    recipient_list:this.allEmails
  }
  this.emailService.sendEmailContacts(data).subscribe(
    (res)=>{
      this.loader=false
      this.success=res
      this.toastr.success(this.success.message)
      this.send_mail.subject='',
      this.send_mail.message=''
      this.dialog.closeAll()
    },
    (err)=>{
      this.loader=false
      this.failed=err
      this.toastr.error(this.failed.error.message)
   
      
    }
  )
}
sendAllAddictMail(){
  this.loader=true
  const data ={
    subject:this.send_mail.subject,
    message:this.send_mail.message,
    from_email:this.send_mail.from_email,
    recipient_list:this.addictsEmails
  }
  this.emailService.sendEmailContacts(data).subscribe(
    (res)=>{
      this.loader=false
      this.success=res
      this.toastr.success(this.success.message)
      this.send_mail.subject='',
      this.send_mail.message=''
      this.dialog.closeAll()
    },
    (err)=>{
      this.loader=false
      this.failed=err
      this.toastr.error(this.failed.error.message)
   
      
    }
  )
}
sendAllProfMail(){
  this.loader=true
  const data ={
    subject:this.send_mail.subject,
    message:this.send_mail.message,
    from_email:this.send_mail.from_email,
    recipient_list:this.profEmails
  }
  this.emailService.sendEmailContacts(data).subscribe(
    (res)=>{
      this.loader=false
      this.success=res
      this.toastr.success(this.success.message)
      this.send_mail.subject='',
      this.send_mail.message=''
      this.dialog.closeAll()
    },
    (err)=>{
      this.loader=false
      this.failed=err
      this.toastr.error(this.failed.error.message)
   
      
    }
  )
}
openSendMail() {
  let dialogRef = this.dialog.open(this.sendEmailDialog);
  dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
          if (result === 'yes') {
        
         
          } else if (result === 'no') {
        
           
          }
      }
  })
}


openAllSendMail() {
  this.allEmails = this.users.map((user: { email: any; }) => user.email);
  console.log(this.allEmails);
  let dialogRef = this.dialog.open(this.sendAllEmailDialog);
  dialogRef.afterClosed().subscribe(result => {
    
      if (result !== undefined) {
          if (result === 'yes') {
        
         
          } else if (result === 'no') {
        
           
          }
      }
  })
}

openAllAdSendMail(){
  this.addictsEmails = this.addicts.map((user: { email: any; }) => user.email);
  console.log(this.addictsEmails);
  let dialogRef = this.dialog.open(this.sendAllAddictEmailDialog);
  dialogRef.afterClosed().subscribe(result => {
    
      if (result !== undefined) {
          if (result === 'yes') {
        
         
          } else if (result === 'no') {
        
           
          }
      }
  })
}

openAllprofSendMail() {
  this.profEmails = this.professional.map((user: { email: any; }) => user.email);
  console.log(this.profEmails);
  let dialogRef = this.dialog.open(this.sendAllProfEmailDialog);
  dialogRef.afterClosed().subscribe(result => {
    
      if (result !== undefined) {
          if (result === 'yes') {
        
         
          } else if (result === 'no') {
        
           
          }
      }
  })
}
ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
}
