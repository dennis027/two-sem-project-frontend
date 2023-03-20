import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';

export interface seenObject {
  diagnosis_date:string;
  diagnosis_subject:string;
  diagnosis_message:string;
  recommendation_date:string;
  recommendation_subject:string;
  recommendation_message:string;
  drug:any
}

export interface unseenClass {
  diagnosis_date: string;
  diagnosis_subject: string;
  diagnosis_message: string;
  drug:any
}

declare function mergediag(questions:any,answers:any):any

@Component({
  selector: 'app-admin-recommendations',
  templateUrl: './admin-recommendations.component.html',
  styleUrls: ['./admin-recommendations.component.css']
})
export class AdminRecommendationsComponent implements OnInit {

  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  username: any;
  uniqueDiagnosis:any
  resed:any
  user_id: any
  uniqueRecom:any
  diagnosis:any
  recommendation:any
  my_id:any
  success:any
  failed:any
  // answeredDiag:any
  // unansweredDiag:any

  @ViewChild('f') form!:NgForm
  @ViewChild('openDialogDia') openDialogDia!: TemplateRef<any>;

  reccom:any={
    diagnosis_id:null,
    user:null,
    recommendation_subject:null,
    recommendation_message:null,
  }
  constructor( 
     private diagnosisService:DiagnosisService,
     private recommendationService:RecommendationsService,
     private toastr: ToastrService,
     private dialog: MatDialog,

     ) { }
     answeredDiag : seenObject[] = [ ];
     displayedSeen: string[] = ['diagnosis_date', 'drug', 'diagnosis_subject', 'diagnosis_message', 'recommendation_date', 'recommendation_subject','recommendation_message'];
     dataSource = new MatTableDataSource([...this.answeredDiag ]);

      unansweredDiag: unseenClass[] = [ ];
     displayedColumns: string[] = ['diagnosis_date', 'drug','diagnosis_subject', 'diagnosis_message','actions'];
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

      this.answeredDiag = this.resed.filter((resed:any) => resed.recommendation_date !== undefined) //filter for UNanswered diagnosis
      // console.log(this.answeredDiag)

      this.unansweredDiag = this.resed.filter((resed:any) => resed.recommendation_date === undefined) //filter for answered diagnosis
      // console.log(this.unansweredDiag)
      }
 
  


    })
  });
  }
  onSubmit(): void{
    const reccom = {
      diagnosis_id:this.my_id,
      user:this.user_id,
      recommendation_subject:this.reccom.recommendation_subject,
      recommendation_message:this.reccom.recommendation_message,
     }

     this.recommendationService.postRecommendation(reccom).subscribe(
      (res)=>{
      
        this.success=res
        this.toastr.success("Replied Successfully")
        this.form.resetForm()
        this.dialog.closeAll()
      },
      (err)=>{
     
        this.failed=err
        this.toastr.error("Error")
      })
  }

  openDialogD() {
    let dialogRef = this.dialog.open(this.openDialogDia);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
             const reccom = {
              diagnosis_id:this.my_id,
              user:this.user_id,
              recommendation_subject:this.reccom.recommendation_subject,
              recommendation_message:this.reccom.recommendation_message,
             }

             this.recommendationService.postRecommendation(reccom).subscribe(
              (res)=>{
              
                this.success=res
                this.toastr.success("Replied Successfully")
                this.form.resetForm()

              },
              (err)=>{
             
                this.failed=err
                this.toastr.error("Error")
              }
            )
            } else if (result === 'no') {
                // TODO: Replace the following line with your code.
                // console.log('User clicked no.');
            }
        }
    })
}

 
getId(id:any){
  let currentData = this.diagnosis.find((p: { id: any; }) =>{return p.id ===  id});
  // console.log(currentData.id)
 this.my_id=currentData.id
}


ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
