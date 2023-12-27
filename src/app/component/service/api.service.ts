import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3030/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  postLoginSellet(): Observable<any> {
    return this.http.post(API_URL + 'login_admin', { responseType: 'text' });
  }

  postRegisterSellet(): Observable<any> {
    return this.http.post(API_URL + 'register_admin', { responseType: 'text' });
  }

  postLoginUser(): Observable<any> {
    return this.http.post(API_URL + 'login_user', { responseType: 'text' });
  }

  postRegisterUser(): Observable<any> {
    return this.http.post(API_URL + 'register_user', { responseType: 'text' });
  }
}
