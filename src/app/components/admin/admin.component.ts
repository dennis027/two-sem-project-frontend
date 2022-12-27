import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder,FormGroup,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AnswersService } from 'src/app/services/answers.service';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { RecommendationsService } from 'src/app/services/recommendations.service';
declare function mergeById(questions:any,answers:any):any
declare function mergediag(diagnosis:any,recommendation:any):any



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  questions:any
  answers:any
  rese:any
  recommendation:any
  diagnosis:any
  
  constructor( private questionService: QuestionsService, private answersService:AnswersService,private diagnosisService:DiagnosisService,private recommendationService:RecommendationsService) { }

  ngOnInit(): void {
    // mergeById(Array,Array)
    this.questionService.getQuestions().subscribe((res: any[]) => {
      this.questions = res;
      console.log(this.questions)
    })
    this.answersService.getAnswers().subscribe((res:any[]) =>{
      this.answers=res;
      console.log(this.answers)
   
        let result = mergeById( this.questions, this.answers);
  
        console.log(result)
    
    })
    this.diagnosisService.getDiagnosis().subscribe((res:any[])=>{
      this.diagnosis=res
      console.log(this.diagnosis)      
      })


    this.recommendationService.getRecommendations().subscribe((res:any[])=>{
      this.recommendation=res
      console.log(this.recommendation)
         
    let test =mergediag(   this.diagnosis,this.recommendation,  );

    console.log(test)
    })
 

  }

}
