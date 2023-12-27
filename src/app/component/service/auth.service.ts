import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:3030/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) { }

  login_seller(username: string, password_hash: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login_seller',
      {
        username,
        password_hash,
      },
      httpOptions
    );
  }

  register_seller(username: string, password_hash: string, mail: string,): Observable<any> {
    return this.http.post(
      AUTH_API + 'register_seller',
      {
        username,
        password_hash,
        mail,
      },
      httpOptions
    );
  }

  login_user(username: string, password_hash: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login_user',
      {
        username,
        password_hash,
      },
      httpOptions
    );
  }

  register_user(username: string, password_hash: string, mail: string,): Observable<any> {
    return this.http.post(
      AUTH_API + 'register_user',
      {
        username,
        password_hash,
        mail,
      },
      httpOptions
    );
  }
}