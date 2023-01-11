import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable, timer } from 'rxjs';

export interface seenObject {
  diagnosis_date:string;
  diagnosis_subject:string;
  diagnosis_message:string;
  recommendation_date:string;
  recommendation_subject:string;
  recommendation_message:string;
}

export interface unseenClass {
  diagnosis_date: string;
  diagnosis_subject: string;
  diagnosis_message: string;
}

declare function mergediag(questions:any,answers:any):any
@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit , OnDestroy {
  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  
  username: any;
  uniqueDiagnosis:any
  resed:any
  user_id: any
  uniqueRecom:any
  diagnosis:any
  recommendation:any
  // answeredDiag:any
  // unansweredDiag:any

  @ViewChild('f') form!:NgForm
  @ViewChild('openDialogDia') openDialogDia!: TemplateRef<any>;

  data:any={
    user:null,
    diagnosis_subject:null,
    diagnosis_message:null,
  }
  constructor( 
     private diagnosisService:DiagnosisService,
     private recommendationService:RecommendationsService,
     private toastr: ToastrService,
     private dialog: MatDialog,

     ) { }
     answeredDiag : seenObject[] = [ ];
     displayedSeen: string[] = ['diagnosis_date', 'diagnosis_subject', 'diagnosis_message', 'recommendation_date', 'recommendation_subject','recommendation_message'];
     dataSource = new MatTableDataSource([...this.answeredDiag ]);

      unansweredDiag: unseenClass[] = [ ];
     displayedColumns: string[] = ['diagnosis_date','diagnosis_subject', 'diagnosis_message'];
     dataSource1 = new MatTableDataSource([...this.unansweredDiag ]);
      ngOnInit(): void {

    this.subscription = this.everyFiveSeconds.subscribe(() => {




    this.username = localStorage.getItem('username')
    this.user_id = localStorage.getItem('user_id')
    // console.log(this.username)

    this.diagnosisService.getDiagnosis().subscribe((res:any[])=>{
      this.diagnosis=res
      // console.log(this.diagnosis)    
      this.uniqueDiagnosis = this.diagnosis.filter((id:any) => id.user == this.user_id)
      // console.log(this.uniqueDiagnosis)
      })

    

    this.recommendationService.getRecommendations().subscribe((res:any[])=>{
      this.recommendation=res
      // console.log(this.recommendation)
      if (this.diagnosis!==undefined && this.recommendation !==undefined){
             this.resed =mergediag(   this.diagnosis ,this.recommendation  );

      // console.log(this.resed)
      // console.log(this.resed)
      this.uniqueRecom = this.resed.filter((id:any) => id.user == this.user_id) //FILTERING DIAGNOSIS ACCORDING TO USER ID
      // console.log(this.uniqueRecom)

      this.answeredDiag = this.uniqueRecom.filter((uniqueRecom:any) => uniqueRecom.recommendation_date !== undefined) //filter for UNanswered diagnosis
      // console.log(this.answeredDiag)

      this.unansweredDiag = this.uniqueRecom.filter((uniqueRecom:any) => uniqueRecom.recommendation_date === undefined) //filter for answered diagnosis
      // console.log(this.unansweredDiag)
      }
 
  


    })

  });
    
  }
  onSubmit(): void{
    // // this.loader=true
    // let {user,diagnosis_subject,diagnosis_message}= this.data;
    // this.diagnosisService.postDiagnois(user =this.user_id,diagnosis_subject,diagnosis_message,).subscribe(
    //   (data) => {
    
    //     // this.loader=false
      
    //     console.log(data)
    //     this.toastr.success('Sober Space Received Your Message');
    //     this.form.resetForm({})
 
     
    //   },
    //   (err) => {
    //     // this.loader=false
    //    console.log(err)
    //    this.toastr.error('Check Your Details ');
    
    //   });
    //   // );
    //   // this.dialogRef.close();
  }

  openDialogD() {
    let dialogRef = this.dialog.open(this.openDialogDia);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              let {user,diagnosis_subject,diagnosis_message}= this.data;
              this.diagnosisService.postDiagnois(user =this.user_id,diagnosis_subject,diagnosis_message,).subscribe(
                (data) => {
              
                  // this.loader=false
                
                  // console.log(data)
                  this.toastr.success('Sober Space Received Your Message');
                  this.form.resetForm({})
           
               
                },
                (err) => {
                  // this.loader=false
                //  console.log(err)
                 this.toastr.error('Check Your Details ');
              
                });
            } else if (result === 'no') {
                // TODO: Replace the following line with your code.
                // console.log('User clicked no.');
            }
        }
    })
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
