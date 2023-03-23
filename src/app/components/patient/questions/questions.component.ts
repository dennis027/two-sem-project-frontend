import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AnswersService } from 'src/app/services/answers.service';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable, timer } from 'rxjs';
declare function mergeById(questions:any,answers:any):any

export interface seenObject {
  question_date:string;
  question_subject:string;
  question_message:string;
  answer_date:string;
  answer_subject:string;
  answer_message:string;
}

export interface unseenClass {
  question_date: string;
  question_subject: string;
  question_message: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit , OnDestroy {
  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  
  @ViewChild('openDialogQues') openDialogQues!: TemplateRef<any>;
  questions: any;
  answers: any;
  mergeQA: any;
  uniqueQA: any;
  user_id: any;
  // uniqueAnswerd: any;
  // uniqueUnanswed: any;
  username: any;
  @ViewChild('f') form!:NgForm
  data:any={
    user:null,
    question_subject:null,
    question_message:null,
  }

  constructor(
    private questionService: QuestionsService,
    private answersService:AnswersService,
  private toastr: ToastrService,
     private dialog: MatDialog,
  ) { }
  uniqueAnswerd : seenObject[] = [ ];
  displayedSeen: string[] = ['question_date', 'question_subject', 'question_message', 'answer_date', 'answer_subject','answer_message'];
  dataSource = new MatTableDataSource([...this.uniqueAnswerd ]);

   uniqueUnanswed: unseenClass[] = [ ];
  displayedColumns: string[] = ['question_date','question_subject', 'question_message'];
  dataSource1 = new MatTableDataSource([...this.uniqueUnanswed ]);
  ngOnInit(): void {

    this.subscription = this.everyFiveSeconds.subscribe(() => {
  

  
    this.username = localStorage.getItem('username')
    this.user_id = localStorage.getItem('user_id')
    // console.log(this.username)
    // mergeById(Array,Array)
    this.questionService.getQuestions().subscribe((res: any[]) => {
      this.questions = res;
      // console.log(this.questions)
    })
    this.answersService.getAnswers().subscribe((res:any[]) =>{
      this.answers=res;
      // console.log(this.answers)
        if(this.questions !==undefined && this.answers !==undefined){
            this.mergeQA = mergeById( this.questions, this.answers);

        // console.log(this.mergeQA)

        this.uniqueQA = this.mergeQA.filter((id:any) => id.user == this.user_id)
        // console.log(this.uniqueQA)
       
        this.uniqueAnswerd = this.uniqueQA.filter((uniqueQA:any) => uniqueQA.answer_date !== undefined) //filter for answered QUESTIONS
        // console.log(this.uniqueAnswerd)


        this.uniqueUnanswed = this.uniqueQA.filter((uniqueQA:any) => uniqueQA.answer_date === undefined) //filter for UNanswered QUESTIONS
        // console.log(this.uniqueUnanswed)

        }
      
  
    })
  });
  }
  openDialogQ() {
    let dialogRef = this.dialog.open(this.openDialogQues);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              let { user,question_subject,question_message}= this.data;
              this.questionService.postQuestion(user =this.user_id,question_subject,question_message,).subscribe(
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
                // );
                // this.dialogRef.close();
                
       
            } else if (result === 'no') {
          
            }
        }
    })
}
  onSubmit(): void{
    let { user,question_subject,question_message}= this.data;
    this.questionService.postQuestion(user =this.user_id,question_subject,question_message,).subscribe(
      (data) => {
    
        // this.loader=false
      
        // console.log(data)
        this.toastr.success('Sober Space Received Your Message');
        this.form.resetForm({})
        this.dialog.closeAll()
     
      },
      (err) => {
        // this.loader=false
      //  console.log(err)
       this.toastr.error('Check Your Details ');
    
      });
      // );
      // this.dialogRef.close();
      
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
