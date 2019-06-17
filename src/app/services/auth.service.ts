import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    // return this.http.post('/api/v1/login', {email, password});
    return this.http.post(env.loginEndpoint, {email, password}, {responseType: 'text'});
  }
}
