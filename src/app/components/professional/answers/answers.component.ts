import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AnswersService } from 'src/app/services/answers.service';
import { QuestionsService } from 'src/app/services/questions.service';
declare function mergeById(questions:any,answers:any):any
export interface unseenClass {
  question_date: string;
  question_subject: string;
  question_message: string;
}


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  questions: any;
  answers: any;
  mergeQA: any;
  uniqueQA: any;
  user_id: any;
  answered:any
  username: any;

  unAnswered: unseenClass[] = [ ];
  displayedColumns: string[] = ['question_date','question_subject', 'question_message'];
  dataSource1 = new MatTableDataSource([...this.unAnswered ]);
  constructor(
    private questionService: QuestionsService,
    private answersService:AnswersService,
    private toastr: ToastrService,
    private dialog: MatDialog,
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
        if(this.questions !==undefined && this.answers !==undefined){
            this.mergeQA = mergeById( this.questions, this.answers);

        console.log(this.mergeQA)

        this.uniqueQA = this.mergeQA.filter((id:any) => id.user == this.user_id)
        console.log(this.uniqueQA)
       
        this.answered = this.mergeQA.filter((mergeQA:any) => mergeQA.answer_date !== undefined) //filter for answered QUESTIONS
        console.log(this.answered)


        this.unAnswered = this.mergeQA.filter((mergeQA:any) => mergeQA.answer_date === undefined) //filter for UNanswered QUESTIONS
        console.log(this.unAnswered)

        }
      
  
    })
  }



}
