import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
export interface unseenClass {
  id:string
  diagnosis_date: string;
  diagnosis_subject: string;
  diagnosis_message: string;
}

declare function mergediag(questions:any,answers:any):any

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  username: any;
  uniqueDiagnosis:any
  resed:any
  user_id: any
  uniqueRecom:any
  diagnosis:any
  recommendation:any
  constructor(
    private diagnosisService:DiagnosisService,
    private recommendationService:RecommendationsService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }
  unansweredDiag: unseenClass[] = [ ];
     displayedColumns: string[] = ['diagnosis_date','diagnosis_subject', 'diagnosis_message','actions'];
     dataSource1 = new MatTableDataSource([...this.unansweredDiag ]);
  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    this.user_id = localStorage.getItem('user_id')
    console.log(this.username)

    this.diagnosisService.getDiagnosis().subscribe((res:any[])=>{
      this.diagnosis=res
      console.log(this.diagnosis)    
      this.uniqueDiagnosis = this.diagnosis.filter((id:any) => id.user == this.user_id)
      console.log(this.uniqueDiagnosis)
      })

    

    this.recommendationService.getRecommendations().subscribe((res:any[])=>{
      this.recommendation=res
      console.log(this.recommendation)
      if (this.diagnosis!==undefined && this.recommendation !==undefined){
             this.resed =mergediag(   this.diagnosis ,this.recommendation  );

      console.log(this.resed)
      console.log(this.resed)
      this.uniqueRecom = this.resed.filter((id:any) => id.user == this.user_id) //FILTERING DIAGNOSIS ACCORDING TO USER ID
      console.log(this.uniqueRecom)


      this.unansweredDiag = this.uniqueRecom.filter((uniqueRecom:any) => uniqueRecom.recommendation_date === undefined) //filter for answered diagnosis
      console.log(this.unansweredDiag)
      }
 
  


    })
    
  }


  getId(id:any){
    let currentData = this.unansweredDiag.find((p) =>{return p.id ===  id});
    console.log(currentData)
  }
}
