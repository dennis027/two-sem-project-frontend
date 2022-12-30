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
import { ApproveService } from 'src/app/services/approve.service';
import { TestimoniesService } from 'src/app/services/testimonies.service';
import { ContactService } from 'src/app/services/contact.service';
declare function mergeById(questions:any,answers:any):any
declare function mergediag(diagnosis:any,recommendation:any):any
declare function mergeByTesti(diagnosis:any,recommendation:any):any



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
  testimony:any
  approve:any
  contact:any
  username: any;
  uniqueDiagnosis:any

  user_id: any
  
  constructor( 
     private questionService: QuestionsService,
     private answersService:AnswersService,
     private diagnosisService:DiagnosisService,
     private recommendationService:RecommendationsService,
     private approveService:ApproveService,
     private testimonyService:TestimoniesService,
     private contactService:ContactService,
     
     ) { }

  ngOnInit(): void {

    this.username = localStorage.getItem('username')
    this.user_id = localStorage.getItem('user_id')
    console.log(this.username)
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
      this.uniqueDiagnosis = this.diagnosis.filter((id:any) => id.user == this.user_id)
      console.log(this.uniqueDiagnosis)
      })


    this.recommendationService.getRecommendations().subscribe((res:any[])=>{
      this.recommendation=res
      console.log(this.recommendation)
      let resed =mergediag(   this.diagnosis ,this.recommendation  );

      console.log(resed)
 
    })
 
    
    this.testimonyService.getTestimonies().subscribe((res:any[])=>{
      this.testimony=res
      console.log(this.testimony)

    })
    this.approveService.getApproval().subscribe((res:any[])=>{
      this.approve=res
      console.log(this.approve)
      let tres =mergeByTesti(   this.testimony,this.approve  );

      console.log(tres) 

    })

   this.contactService.getContact().subscribe((res:any[])=>{
      this.contact=res
      console.table(this.contact)
   })


  }

}
