import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders ({'Content-Type':'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questionAPI = environment.apiUrl+'questionsAPI/';
  constructor(private httpClient:HttpClient,private http:HttpClient) {
   }

  getQuestions(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.questionAPI);
  }
  postQuestion(user:string,question_subject:string,question_message:string): Observable<any>{
    return this.http.post(this.questionAPI,{
      
      user,question_subject,question_message,
    },httpOptions)
  }
}
