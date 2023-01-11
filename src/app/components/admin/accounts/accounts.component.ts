import { Component, HostListener, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import {AfterViewInit,  ViewChild,TemplateRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';

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

export class AccountsComponent implements OnInit {

  @ViewChild('adminDialog') adminDialog!: TemplateRef<any>;
  @ViewChild('professionalDialog') professionalDialog!: TemplateRef<any>;
  @ViewChild('addictsDialog') addictsDialog!: TemplateRef<any>;
  @ViewChild('deleteAccountDialog') deleteAccountDialog!: TemplateRef<any>;

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

  userProf:any={
    username:null,
    email:null,
    phone:null,
    role:null,
    password:null
  }
  userAdd:any={
    username:null,
    email:null,
    phone:null,
    role:null,
    password:null
  }
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
    private dialog: MatDialog,) { }


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
    this.dataSource.sort = this.sort;
    this.usersService.getUsers().subscribe((res:any[])=>{
      this.users=res
      console.log(this.users)

      this.admin = this.users.filter((users:any) => users.role === "is_admin")
      console.log(this.admin)

      this.professional = this.users.filter((users:any) => users.role === "is_professional")
      console.log(this.professional)

      this.addicts = this.users.filter((users:any) => users.role === "is_addict")
      console.log(this.addicts)
    })
   
  
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
          
        console.log(data)
        this.toastr.success('Admin Added Successfully');
        this.form.resetForm({})
      },
      (err)=>{
        console.log(err)
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
          
        console.log(data)
        this.toastr.success('Professional Added Successfully');
        this.form.resetForm({})
      },
      (err)=>{
        console.log(err)
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
          
        console.log(data)
        this.toastr.success('Addict Added Successfully');
        this.form.resetForm({})
      },
      (err)=>{
        console.log(err)
        this.toastr.error('Check Your Details ');
      }
    )
  }


  callAddict(){
    let dialogRef = this.dialog.open(this.addictsDialog);
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
  callProfessional(){
    let dialogRef = this.dialog.open(this.professionalDialog);
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




  callAdmin(){
    let dialogRef = this.dialog.open(this.adminDialog);
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


  deleteUser(id:any) {
    let dialogRef = this.dialog.open(this.deleteAccountDialog);
    let currentData = this.users.find((p: { id: any; }) =>{return p.id ===  id});
   this.usrname=currentData.username
    dialogRef.afterClosed().subscribe(result => {

        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              this.usersService.deleteUser(id).subscribe(
                // (msg) => console.log(msg),
                // (error) => console.log(error)
              );
            } else if (result === 'no') {
                // TODO: Replace the following line with your code.
                console.log('User clicked no.');
            }
        }
    })
}
}
