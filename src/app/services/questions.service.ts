import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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

}
