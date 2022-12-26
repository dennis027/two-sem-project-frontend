import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder,FormGroup,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AnswersService } from 'src/app/services/answers.service';
declare function mergeById(questions:any,answers:any):any
let studentDetails = [
  {
    "id": 1,
    "user": 1,
    "question_subject": "come on deploy",
    "question_message": "q1",
    "question_date": "2022-12-28T03:00:00+03:00"
},
{
    "id": 2,
    "user": 4,
    "question_subject": "come on",
    "question_message": "q2",
    "question_date": "2022-12-21T03:00:00+03:00"
},
{
    "id": 3,
    "user": 6,
    "question_subject": "How glad I am today",
    "question_message": "q3",
    "question_date": "2022-12-26T12:12:00.182501+03:00"
}
];

let studentMark = [
  {
    // "id": 1,
    "question_id": 1,
    "user": 4,
    "answer_subject": "we can work",
    "answer_message": "one",
    "answer_date": "2022-12-30T03:00:00+03:00"
},
{
    // "id": 2,
    "question_id": 2,
    "user": 4,
    "answer_subject": "eddie fights",
    "answer_message": "two",
    "answer_date": "2022-12-21T03:00:00+03:00"
},
{
    // "id": 3,
    "question_id": 3,
    "user": 3,
    "answer_subject": "let me test this",
    "answer_message": "three",
    "answer_date": "2022-12-26T12:12:51.125189+03:00"
}
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  questions:any
  answers:any
  rese:any
  
  constructor( private questionService: QuestionsService, private answersService:AnswersService) { }

  ngOnInit(): void {
    // mergeById(Array,Array)
    this.questionService.getQuestions().subscribe((res: any[]) => {
      this.questions = res;
      console.log(this.questions)
    })
    this.answersService.getAnswers().subscribe((res:any[]) =>{
      this.answers=res;
      console.log(this.answers)
   
        let result = mergeById( studentDetails, studentMark);
  
        console.log(result)
    
    })
    
 
  }

}
