
import { Component, OnInit, ViewChild,} from '@angular/core';
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


import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  mergeQA:any
  contact:any
  username: any;
  uniqueDiagnosis:any
  resed:any
  user_id: any
  uniqueRecom:any
  answeredDiag:any
  unansweredDiag:any
  mergeApprove:any
  uniqueTestimonies:any
  answeredTestimonies:any
  approvedTestimonies:any
  unApprovedTestimonies:any
  uniqueQuestion:any
  uniqueAnswerd:any
  uniqueUnanswed:any
  uniqueQA:any
  @ViewChild('snav', { static: false }) usuarioMenu!: MatSidenav;

  panelOpenState = false;
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  private _mobileQueryListener: () => void;
 
  constructor( 
     private questionService: QuestionsService,
     private answersService:AnswersService,
     private diagnosisService:DiagnosisService,
     private recommendationService:RecommendationsService,
     private approveService:ApproveService,
     private testimonyService:TestimoniesService,
     private contactService:ContactService,
     changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
     
     ) { 
      this.mobileQuery = media.matchMedia('(max-width: 896px)',);
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  
     }

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
   
        this.mergeQA = mergeById( this.questions, this.answers);
  
        console.log(this.mergeQA)

        this.uniqueQA = this.mergeQA.filter((id:any) => id.user == this.user_id)
        console.log(this.uniqueQA)
       
        this.uniqueAnswerd = this.uniqueQA.filter((uniqueQA:any) => uniqueQA.answer_date !== undefined) //filter for answered QUESTIONS
        console.log(this.uniqueAnswerd)


        this.uniqueUnanswed = this.uniqueQA.filter((uniqueQA:any) => uniqueQA.answer_date === undefined) //filter for UNanswered QUESTIONS
        console.log(this.uniqueUnanswed)
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
      this.resed =mergediag(   this.diagnosis ,this.recommendation  );
      console.log(this.resed)
      console.log(this.resed)
      this.uniqueRecom = this.resed.filter((id:any) => id.user == this.user_id) //FILTERING DIAGNOSIS ACCORDING TO USER ID
      console.log(this.uniqueRecom)

      this.answeredDiag = this.uniqueRecom.filter((uniqueRecom:any) => uniqueRecom.recommendation_date !== undefined) //filter for UNanswered diagnosis
      console.log(this.answeredDiag)

      this.answeredTestimonies = this.uniqueRecom.filter((uniqueRecom:any) => uniqueRecom.recommendation_date === undefined) //filter for answered diagnosis
      console.log(this.answeredTestimonies)


    })

    this.testimonyService.getTestimonies().subscribe((res:any[])=>{
      this.testimony=res
      console.log(this.testimony)

    })
    this.approveService.getApproval().subscribe((res:any[])=>{
      this.approve=res
      console.log(this.approve)
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
    })

   this.contactService.getContact().subscribe((res:any[])=>{
      this.contact=res
      console.log(this.contact)
   })


  }
  public closeSidenav() {
    if (window.innerWidth < 896) {
      this.usuarioMenu.close();
  }
    console.log("waaaaiiii")
   
 
  }
   ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
