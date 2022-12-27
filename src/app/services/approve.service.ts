import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {
  approveAPI = environment.apiUrl+'approveAPI/'

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  getApproval(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.approveAPI);
  }
}
