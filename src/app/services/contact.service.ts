import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactAPI = environment.apiUrl+'contact/';
  constructor(private httpClient:HttpClient,private http:HttpClient) {
   }

  getContact(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.contactAPI);
  }
}
