import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from './credentials.model';

import { AppConfig } from 'app/config/app.config';

const APIURL = AppConfig.endpoints.api;
const AUTH_TOKEN = 'AUTH_TOKEN';

@Injectable()
export class AuthService {

  localStorage: Storage;

  constructor(
    private http: HttpClient
  ) {
    //TODO use component
    this.localStorage = window.localStorage;
  }

  logIn(credentials: Credentials): Promise<any> {
    var token = btoa(credentials.username + ':' + credentials.password);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token
    });
    return this.http.get<void>(
      `${APIURL}/security/sessionPlayer`, {
        headers: headers,
        observe: 'response'
      }
    ).toPromise()
    .then((response)=>{
      localStorage.setItem(AUTH_TOKEN, token);
    });
  }


  isAuthenticated(): boolean {
    //TODO: use javascript variable
    const token: string = localStorage.getItem(AUTH_TOKEN);
    return !!token;
  }


}
