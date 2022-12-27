import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
