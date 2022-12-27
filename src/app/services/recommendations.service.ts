import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
