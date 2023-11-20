import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  
  constructor(private http: HttpClient, private storageService: StorageService ) {}


  //  token = this.storageService.getUser();
  //  if(token != null)
  //     httpOptions = {
  //       headers: new HttpHeaders({
  //         'Authorization': 'Bearer '+this.token.accessToken
  //       })
  //     };



  getAllUser(): Observable<any> {

    return this.http.get(API_URL + 'auth/users', { responseType: 'json'});
  }

    updateUserStatus(id: any, isActive: boolean): any {
      const options = { active: isActive };
      return this.http.post(
        API_URL + 'user/status/'+id+"/"+isActive, { responseType: 'json'});  
    }

    deleteUser(id: any): Observable<any> {
      return this.http.delete(API_URL + 'user/'+id, { responseType: 'json' });
    }

    createGroup(group:any):any {
      return this.http.post(
        API_URL + "group", group, { responseType: 'json' });
    }

    createUser(userData: any): Observable<any> {
      return this.http.post(
        API_URL + "user", userData, { observe: 'response' });
    }

    getAllPermission(): Observable<any>{
      return this.http.get(API_URL + 'permissions', { responseType: 'json' });
    }

    getuserById(id: any) {
      return this.http.get(API_URL + 'user/'+id, { responseType: 'json' });
    }
    

}
