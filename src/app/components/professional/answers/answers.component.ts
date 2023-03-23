import { Component, OnInit, TemplateRef, ViewChild,OnDestroy } from '@angular/core';
import { AnswersService } from 'src/app/services/answers.service';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Observable, timer,Subscription } from 'rxjs';
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
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit , OnDestroy {
  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  @ViewChild('openDialogQues') openDialogQues!: TemplateRef<any>;
  @ViewChild('openAnswerDialog') openAnswerDialog!: TemplateRef<any>;
  @ViewChild('updatAnswers') uptFunction!:NgForm //declare assign fun form
  @ViewChild('openUpdateDialog') openUpdateDialog!: TemplateRef<any>;
  questions: any;
  answers: any;
  mergeQA: any;
  uniqueQA: any;
  user_id: any;
  ide:any
  dat:any
  ident:any;
  qid:any
  // uniqueAnswerd: any;
  // uniqueUnanswed: any;
  username: any;
  @ViewChild('f') form!:NgForm
  data:any={
    user:null,
    question_subject:null,
    question_message:null,
  }

  answer:any = {
    question_id:null,
    user:null,
    answer_subject:null,
    answer_message:null,
  }

  updateAnswer:any = {
    question_id:null,
    user:null,
    answer_subject:null,
    answer_message:null,
    answer_date:null
  }

  constructor(
    private questionService: QuestionsService,
    private answersService:AnswersService,
  private toastr: ToastrService,
     private dialog: MatDialog,
  ) { }
  uniqueAnswerd : seenObject[] = [ ];
  displayedSeen: string[] = ['question_date', 'question_subject', 'question_message', 'answer_date', 'answer_subject','answer_message','actions'];
  dataSource = new MatTableDataSource([...this.uniqueAnswerd ]);

   uniqueUnanswed: unseenClass[] = [ ];
  displayedColumns: string[] = ['question_date','question_subject', 'question_message','actions'];
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
       
        this.uniqueAnswerd = this.mergeQA.filter((mergeQA:any) => mergeQA.answer_date !== undefined) //filter for answered QUESTIONS
        // console.log(this.uniqueAnswerd)


        this.uniqueUnanswed = this.mergeQA.filter((mergeQA:any) => mergeQA.answer_date === undefined) //filter for UNanswered QUESTIONS
        // console.log(this.uniqueUnanswed)

        }
      
  
    })

  });
  }

  onGetId(id:any){
    let currentData = this.questions.find((p: { id: any; }) =>{return p.id ===  id});
    // console.log(currentData.id)
    this.ident=currentData.id
  }
  onSubmit(){
   
  const answer = {
    question_id:this.ident,
    user:this.user_id,
    answer_subject:this.answer.answer_subject,
    answer_message:this.answer.answer_message,
  }

  this.answersService.answerQ(answer).subscribe(
    (data)=>{
        
      // console.log(data)
      this.toastr.success('Sober Space Received Your Message');
      this.form.resetForm({})
      this.dialog.closeAll()
    },
    (err)=>{
      // console.log(err)
      this.toastr.error('Check Your Details ');
    }
  )
  }
  openDialog(){
    let dialogRef = this.dialog.open(this.openAnswerDialog);
        dialogRef.afterClosed().subscribe(result => {
            // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
            if (result !== undefined) {
                if (result === 'yes') {
                  
                } else if (result === 'no') {
             
                }
            }
        })
  }
  updateAnswers(id:any){
    let currentData = this.mergeQA.find((p: { id: any; }) =>{return p.id ===  id});
    // console.log(currentData)
    this.ide=currentData.id
    this.dat=currentData.answer_date
    this.qid = currentData.question_id
    this.uptFunction.setValue({
      // question_id:currentData.question_id,
      // user:this.user_id,
      answer_subject:currentData.answer_subject,
      answer_message:currentData.answer_message,
    })

  }


  onUpdate(){
    const updatedAnswer = {
      question_id:this.qid,
      user:this.user_id,
      answer_subject:this.updateAnswer.answer_subject,
      answer_message:this.updateAnswer.answer_message,
      answer_date:this.dat
    }
  this.answersService.updateAnswers(this.ide,updatedAnswer)
  this.uptFunction.resetForm()
  this.dialog.closeAll()
    

  }

  updateAnswerDialog() {
    
    let dialogRef = this.dialog.open(this.openUpdateDialog);
    dialogRef.afterClosed().subscribe(result => {
      
        if (result !== undefined) {
            if (result === 'yes') {
    
                // console.log('User clicked yes.');
            } else if (result === 'no') {

                // console.log('User clicked no.');
            }
        }
    })
}


ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
}
