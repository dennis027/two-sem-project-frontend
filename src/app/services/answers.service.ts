import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  answersAPI = environment.apiUrl+'answersAPI/'

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  getAnswers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.answersAPI);
  }
}
