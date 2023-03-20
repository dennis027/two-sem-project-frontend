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
export class DiagnosisService {
  diagnosisAPI = environment.apiUrl+'diagnosisAPI/';
  constructor(private httpClient:HttpClient,private http:HttpClient) {
   }

  getDiagnosis(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.diagnosisAPI);
  }
  postDiagnois(user:string,drug:string,diagnosis_subject:string,diagnosis_message:string): Observable<any>{
    return this.http.post(this.diagnosisAPI,{
      
      user,drug,diagnosis_subject,diagnosis_message,
    },httpOptions)
  }

}
