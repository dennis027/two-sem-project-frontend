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
export class TestimoniesService {

  testimonyAPI = environment.apiUrl+'testimoniesAPI/'

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  getTestimonies(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.testimonyAPI);
  }

  postTestimonies(user:string,testimony_subject:string,testimony_message:string,testimony_location:string): Observable<any>{
    return this.http.post(this.testimonyAPI,{
      
      user,testimony_subject,testimony_message,testimony_location
    },httpOptions)
  }
}
