import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const questionAPI = environment.apiUrl+'questionsAPI/';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient:HttpClient,private http:HttpClient) {

    
   }
}
