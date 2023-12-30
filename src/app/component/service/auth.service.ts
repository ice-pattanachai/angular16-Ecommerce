import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { catchError, map } from 'rxjs/operators';

const AUTH_API = 'http://172.20.0.7:3030/api/';

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

  authenticateToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .post<any>(AUTH_API + 'authen ', {}, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => throwError(error))
      );
  }

  removeItem (){
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
  }
}