import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private readonly _loginState = new BehaviorSubject(this.isUserLoggedIn());
  readonly loginState$ = this._loginState.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  userHasToken() {
    return !!localStorage.getItem('token');
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('token');
  }

  setUserLogggedIn(status: boolean) {
    this._loginState.next(status);
  }

  getUserLoggedIn() {
    return this._loginState.getValue();
  }

  login(email: string, password: string) {
    const url = env.apiEndpoint + env.loginEndpoint;
    return new Observable((obs) => {
      this.http.post(url, {email, password}, {responseType: 'text'})
        .subscribe((res) => {
          obs.next(res);
        }, (error) => {
          obs.error(error);
        }, () => {
          obs.complete();
        });
    });
  }

  signup(newUser: any): Observable<object> {
    const url = env.apiEndpoint + env.signupEndpoint;
    return new Observable((obs) => {
      this.http.post(url, {newUser}).subscribe((res: any) => {
        obs.next(res);
      }, (error: any) => {
        obs.error(error);
      }, () => {
        obs.complete();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.setUserLogggedIn(false);
    window.location.href = '/login';
  }
}
