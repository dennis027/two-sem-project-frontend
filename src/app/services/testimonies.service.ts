import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimoniesService {

  testimonyAPI = environment.apiUrl+'testimoniesAPI/'

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  getTestimonies(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.testimonyAPI);
  }
}
