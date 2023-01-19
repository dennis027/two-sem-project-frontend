import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TestimoniesService } from 'src/app/services/testimonies.service';
import { ApproveService } from 'src/app/services/approve.service';
import { Observable, Subscription, timer } from 'rxjs';
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


@Component({
  selector: 'app-testimony-home',
  templateUrl: './testimony-home.component.html',
  styleUrls: ['./testimony-home.component.css']
})
export class TestimonyHomeComponent implements OnInit {
  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  testimony: any;
  approve: any;
  mergeApprove: any;
  uniqueTestimonies: any;

  unansweredDiag: any;
  answeredTestimonies: any;
  unApprovedTestimonies: any;
  constructor(
    private testimonyService:TestimoniesService,
    private approveService:ApproveService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  approvedTestimonies : seenObject[] = [ ];
  displayedApproved: string[] = ['testimony_date', 'testimony_subject', 'testimony_message', 'testimony_location', 'approve_date'];
  dataSource3 = new MatTableDataSource([...this.approvedTestimonies ]);
  ngOnInit(): void {

    this.subscription = this.everyFiveSeconds.subscribe(() => {
 



 
    // console.log(this.username)

    this.testimonyService.getTestimonies().subscribe((res:any[])=>{
      this.testimony=res
      // console.log(this.testimony)

    })
    this.approveService.getApproval().subscribe((res:any[])=>{
      this.approve=res
      // console.log(this.approve) 
      if(this.testimony!==undefined && this.approve !==undefined){
        this.mergeApprove =mergeByTesti(   this.testimony,this.approve  );

            // console.log( this.mergeApprove) 



      this.unansweredDiag = this.mergeApprove.filter((mergeApprove:any) => mergeApprove.approve_date === undefined) //filter for answered testimonies
      // console.log(this.unansweredDiag)


      this.answeredTestimonies = this.mergeApprove.filter((mergeApprove:any) => mergeApprove.approve_date !== undefined) //filter for answered testimonies
      // console.log(this.answeredTestimonies)
      
      this.approvedTestimonies = this.answeredTestimonies.filter((answeredTestimonies:any) => answeredTestimonies.approveTF === 'T') //filter for APPROVED testimonies
      // console.log(this.approvedTestimonies)

      this.unApprovedTestimonies = this.answeredTestimonies.filter((answeredTestimonies:any) => answeredTestimonies.approveTF === 'F') //filter for DISAPPROVED testimonies
      // console.log(this.unApprovedTestimonies)
      }


  
    })

  });
  }

}
