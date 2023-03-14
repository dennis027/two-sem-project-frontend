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
export class SendMailService {
  sendMailApi = environment.apiUrl+ 'send-email/'
  constructor(private httpClient:HttpClient,private http:HttpClient) { }

  sendEmailContacts( data:any ): Observable<any>{
 
    return this.http.post(this.sendMailApi,data,httpOptions)
    
  }
}
