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
  reset_password_api=environment.apiUrl+'api/password_reset/'
  new_password=environment.apiUrl+'/api/password_reset/confirm/'
  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<any[]>{
    return this.httpClient.get<any[]>(this.usersAPI);
  }

  addUser(userData:any): Observable<any>{
    return this.httpClient.post(this.usersAPI,userData,httpOptions)
  }

  deleteUser (id: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.usersAPI + id+'/');  
  }
  forgetPassword(email:any):Observable<any>{
    return this.httpClient.post(this.reset_password_api,email,httpOptions)
  }
  resetPassword(newPassword:any):Observable<any>{
    return this.httpClient.post(this.new_password,newPassword,httpOptions)
  }
}
