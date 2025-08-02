import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://192.168.0.12:8000/api/v1';

  constructor(private http: HttpClient) {}

  login(credentials: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}