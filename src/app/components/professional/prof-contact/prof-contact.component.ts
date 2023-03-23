import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SendMailService } from 'src/app/services/send-mail.service';
export interface PeriodicElement {
  name:string;
  email:string;
  subject:string;
  message:string;
  date:string;
  id:any
}


@Component({
  selector: 'app-prof-contact',
  templateUrl: './prof-contact.component.html',
  styleUrls: ['./prof-contact.component.css']
})
export class ProfContactComponent implements OnInit , OnDestroy {
  @ViewChild('sendEmailDialog') sendEmailDialog!: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  contact: PeriodicElement[] = [

  ];
  displayedColumns: string[] = ['name', 'email', 'subject', 'message', 'date','actions'];
  dataSource = new MatTableDataSource([...this.contact]);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  
  // contact:any
  constructor(    private contactService:ContactService,
                  private toastr: ToastrService,
                  private dialog: MatDialog,
                  private emailService:SendMailService) { }

    loader:boolean=false
    thisEmail:any
    userMail:any
    currentEmail:any
    success:any
    failed:any
    send_mail:any = {
      subject:'',
      message:'',
      from_email:environment.emailAddress,
      recipient_list:[]
    }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.contactService.getContact().subscribe((res:any[])=>{
        this.contact=res

     })
    });

  }

  openDeleteDialog(id:any) {
    let dialogRef = this.dialog.open(this.deleteDialog);
    // let currentData = this.contact.find((p: { id: any; }) =>{return p.id ===  id});
    // console.log(currentData.id)
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              this.contactService.deleteData(id).subscribe(
                // (msg) => console.log(msg),
                // (error) => console.log(error)
              );
            } else if (result === 'no') {
           
            }
        }
    })
}

getEmail(id:any){
  console.log(id)
  let currentRole = this.contact.find((p) =>{return p.id ===  id});
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

ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
}
