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
export class ApproveService {
  approveAPI = environment.apiUrl+'approveAPI/'

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  getApproval(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.approveAPI);
  }

  postApproval(approveObject:any): Observable<any>{
    return this.http.post(this.approveAPI,approveObject,httpOptions)
  }
  deleteData (id: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.approveAPI + id);  
  }
  
  updateData(ident:any,approveObject:any) {
    return this.http.put(this.approveAPI + ident +'/', approveObject).subscribe();
  }
}
