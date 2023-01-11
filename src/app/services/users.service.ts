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
export class UsersService {
  usersAPI = environment.apiUrl + 'user/';
  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<any[]>{
    return this.httpClient.get<any[]>(this.usersAPI);
  }
}
