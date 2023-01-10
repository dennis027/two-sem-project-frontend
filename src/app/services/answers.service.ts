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
export class AnswersService {
  answersAPI = environment.apiUrl+'answersAPI/'

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  getAnswers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.answersAPI);
  }

  answerQ(answer:any): Observable<any>{
    return this.http.post(this.answersAPI,answer,httpOptions)
  }
  updateAnswers(ide:any,answer:any){
    return this.http.put(this.answersAPI + ide +'/', answer).subscribe();
  }
}
