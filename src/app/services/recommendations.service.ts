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
export class RecommendationsService {
  reomendationAPI = environment.apiUrl+'RecommendationsAPI/';
  constructor(private httpClient:HttpClient,private http:HttpClient){

  }
  getRecommendations():Observable<any[]>{
    return this.httpClient.get<any[]>(this.reomendationAPI)
  }
  postRecommendation(reccom:any):Observable<any>{
    return this.http.post(this.reomendationAPI,reccom,httpOptions)
  }
}
