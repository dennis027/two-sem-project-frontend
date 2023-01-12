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
export class ContactService {
 
  contactAPI = environment.apiUrl+'contact/';
  constructor(private httpClient:HttpClient,private http:HttpClient) {
   }

  getContact(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.contactAPI);
  }
  postContact(name:string,email:string,subject:string,message:string): Observable<any>{
    return this.http.post(this.contactAPI,{   
      name,email,subject,message
    },httpOptions)
  }
  deleteData (id: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.contactAPI + id+'/');  
  }
}
