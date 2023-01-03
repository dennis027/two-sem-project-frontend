import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TestimoniesService } from 'src/app/services/testimonies.service';
import { ApproveService } from 'src/app/services/approve.service';
declare function mergeByTesti(diagnosis:any,recommendation:any):any
export interface seenObject {
  testimony_date:string;
  testimony_subject:string;
  testimony_message:string;
  testimony_location:string;
  approve_date:string;
  approveTF:string;
}

export interface unseenClass {
  testimony_date: string;
  testimony_subject: string;
  testimony_message: string;
  testimony_location:string
}
@Component({
  selector: 'app-testimonies',
  templateUrl: './testimonies.component.html',
  styleUrls: ['./testimonies.component.css']
})
export class TestimoniesComponent implements OnInit {
  @ViewChild('f') form!:NgForm
  @ViewChild('openDialogDia') openDialogDia!: TemplateRef<any>;
  testimony: any;
  approve: any;
  mergeApprove: any;
  uniqueTestimonies: any;
  user_id: any;
  // unansweredDiag: any;
  // answeredTestimonies: any;
  // approvedTestimonies: any;
  // unApprovedTestimonies: any;
  username:any
  data:any={
    user:null,
    testimony_subject:null,
    testimony_message:null,
    testimony_location:null,
  }
  constructor(
    private testimonyService:TestimoniesService,
    private approveService:ApproveService,
    private toastr: ToastrService,
    private dialog: MatDialog,

  ) {}
  answeredTestimonies : seenObject[] = [ ];
  displayedSeen: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date','approveTF'];
  dataSource = new MatTableDataSource([...this.answeredTestimonies ]);

  approvedTestimonies : seenObject[] = [ ];
  displayedApproved: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date','approveTF'];
  dataSource3 = new MatTableDataSource([...this.approvedTestimonies ]);

  unApprovedTestimonies : seenObject[] = [ ];
  displayedunApproved: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date','approveTF'];
  dataSource2 = new MatTableDataSource([...this.unApprovedTestimonies ]);

   unansweredDiag: unseenClass[] = [ ];
  displayedColumns: string[] = ['testimony_date','testimony_subject', 'testimony_message','testimony_location'];
  dataSource1 = new MatTableDataSource([...this.unansweredDiag ]);
  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    this.user_id = localStorage.getItem('user_id')
    console.log(this.username)

    this.testimonyService.getTestimonies().subscribe((res:any[])=>{
      this.testimony=res
      console.log(this.testimony)

    })
    this.approveService.getApproval().subscribe((res:any[])=>{
      this.approve=res
      console.log(this.approve) 
      if(this.testimony!==undefined && this.approve !==undefined){
        this.mergeApprove =mergeByTesti(   this.testimony,this.approve  );

            console.log( this.mergeApprove) 

      this.uniqueTestimonies = this.mergeApprove.filter((id:any) => id.user == this.user_id) //FILTERING DIAGNOSIS ACCORDING TO USER ID
      console.log(this.uniqueTestimonies)

      this.unansweredDiag = this.uniqueTestimonies.filter((uniqueTestimonies:any) => uniqueTestimonies.approve_date === undefined) //filter for answered testimonies
      console.log(this.unansweredDiag)


      this.answeredTestimonies = this.uniqueTestimonies.filter((uniqueTestimonies:any) => uniqueTestimonies.approve_date !== undefined) //filter for answered testimonies
      console.log(this.answeredTestimonies)
      
      this.approvedTestimonies = this.answeredTestimonies.filter((answeredTestimonies:any) => answeredTestimonies.approveTF === 'T') //filter for APPROVED testimonies
      console.log(this.approvedTestimonies)

      this.unApprovedTestimonies = this.answeredTestimonies.filter((answeredTestimonies:any) => answeredTestimonies.approveTF === 'F') //filter for DISAPPROVED testimonies
      console.log(this.unApprovedTestimonies)
      }


  
    })
  }
  openDialogD() {
    let dialogRef = this.dialog.open(this.openDialogDia);
        dialogRef.afterClosed().subscribe(result => {
            // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
            if (result !== undefined) {
                if (result === 'yes') {
                  let {user = this.user_id,testimony_subject,testimony_message,testimony_location}= this.data;
                  this.testimonyService.postTestimonies(user =this.user_id,testimony_subject,testimony_message,testimony_location).subscribe(
                    (data) => {
                  
                      // this.loader=false
                    
                      console.log(data)
                      this.toastr.success('Sober Space Received Your Message');
                      this.form.resetForm({})
               
                   
                    },
                    (err) => {
                      // this.loader=false
                     console.log(err)
                     this.toastr.error('Check Your Details ');
                  
                    });
                    // );
                } else if (result === 'no') {
                    // TODO: Replace the following line with your code.
                    console.log('User clicked no.');
                }
            }
        })
  }

  onSubmit(): void{
    // this.loader=true
    let {user = this.user_id,testimony_subject,testimony_message,testimony_location}= this.data;
    this.testimonyService.postTestimonies(user =this.user_id,testimony_subject,testimony_message,testimony_location).subscribe(
      (data) => {
    
        // this.loader=false
      
        console.log(data)
        this.toastr.success('Sober Space Received Your Message');
        this.form.resetForm({})
 
     
      },
      (err) => {
        // this.loader=false
       console.log(err)
       this.toastr.error('Check Your Details ');
    
      });
      // );
      // this.dialogRef.close();
  }

}
