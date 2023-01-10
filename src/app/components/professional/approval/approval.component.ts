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
  id:string
}

export interface unseenClass {
  testimony_date: string;
  testimony_subject: string;
  testimony_message: string;
  testimony_location:string
  id:string
}

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  approveObject: any = {
    testimony_id: null,
    user: null,
    approveTF: null,
  };

  updateObject:any = {
    id:null,
    testimony_id: null,
    user: null,
    approveTF: null,
    approve_date:null
  }

  @ViewChild('f') form!:NgForm
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  testimony: any;
  approve: any;
  mergeApprove: any;
  uniqueTestimonies: any;
  user_id: any;
  success:any
  failed:any
  ident:any
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
  displayedSeen: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date','actions'];
  dataSource = new MatTableDataSource([...this.answeredTestimonies ]);

  approvedTestimonies : seenObject[] = [ ];
  displayedApproved: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date','actions'];
  dataSource3 = new MatTableDataSource([...this.approvedTestimonies ]);

  unApprovedTestimonies : seenObject[] = [ ];
  displayedunApproved: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date','actions'];
  dataSource2 = new MatTableDataSource([...this.unApprovedTestimonies ]);

   unansweredDiag: unseenClass[] = [ ];
  displayedColumns: string[] = ['testimony_date','testimony_subject', 'testimony_message','testimony_location','actions'];
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

      this.unansweredDiag = this.mergeApprove.filter((mergeApprove:any) => mergeApprove.approve_date === undefined) //filter for answered testimonies
      console.log(this.unansweredDiag)


      this.answeredTestimonies = this.mergeApprove.filter((mergeApprove:any) => mergeApprove.approve_date !== undefined) //filter for answered testimonies
      console.log(this.answeredTestimonies)
      
      this.approvedTestimonies = this.answeredTestimonies.filter((answeredTestimonies:any) => answeredTestimonies.approveTF === 'T') //filter for APPROVED testimonies
      console.log(this.approvedTestimonies)

      this.unApprovedTestimonies = this.answeredTestimonies.filter((answeredTestimonies:any) => answeredTestimonies.approveTF === 'F') //filter for DISAPPROVED testimonies
      console.log(this.unApprovedTestimonies)
      }


  
    })
  }

  getTrue(id:any){
    let currentData = this.testimony.find((p: { id: any; }) =>{return p.id ===  id});
    console.log(currentData)
    const approveObject = {
      testimony_id: currentData.id,
      user: this.user_id,
      approveTF: 'T',
    }
    this.approveService.postApproval(approveObject).subscribe(
      (res)=>{
      
        this.success=res
        this.toastr.success("Approved Successfully")
 
      },
      (err)=>{
     
        this.failed=err
        this.toastr.error("Error")
      }
    )
  }
  getFalse(id:any){
    let currentData = this.testimony.find((p: { id: any; }) =>{return p.id ===  id});
    console.log(currentData)
    const approveObject = {
      testimony_id: currentData.id,
      user: this.user_id,
      approveTF: 'F',
    }
    this.approveService.postApproval(approveObject).subscribe(
      (res)=>{
      
        this.success=res
        this.toastr.success('Disapproved Successfully')
 
      },
      (err)=>{
     
        this.failed=err
        this.toastr.error("Error")
      }
    )
  }

  disAppApproved(id:any){
    let currentData = this.approve.find((p: { testimony_id: any; }) =>{return p.testimony_id ===  id});
    console.log(currentData)
    this.ident=currentData.id
    console.log(this.ident)
    const updateObject = {
      id:currentData.id,
      testimony_id: currentData.testimony_id,
      user: currentData.user,
      approveTF: 'F',
      approve_date:currentData.approve_date,
    }
    this.approveService.updateData(this.ident,updateObject)
    
  }

  appDisapproved(id:any){
    let currentData = this.approve.find((p: { testimony_id: any; }) =>{return p.testimony_id ===  id});
    console.log(currentData)
    this.ident=currentData.id
    console.log(this.ident)
    const updateObject = {
      id:currentData.id,
      testimony_id: currentData.testimony_id,
      user: currentData.user,
      approveTF: 'T',
      approve_date:currentData.approve_date,
    }
    this.approveService.updateData(this.ident,updateObject)
    
  }

  deleteTestimony(id:any){
    let currentData = this.testimony.find((p: { id: any; }) =>{return p.id ===  id});
    console.log(currentData.id)

   
   
  }

  openDeleteDialog(id:any) {
    let dialogRef = this.dialog.open(this.deleteDialog);
    let currentData = this.testimony.find((p: { id: any; }) =>{return p.id ===  id});
    console.log(currentData.id)
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              this.testimonyService.deleteData(id).subscribe(
                (msg) => console.log(msg),
                (error) => console.log(error)
              );
            } else if (result === 'no') {
           
            }
        }
    })
}
}
