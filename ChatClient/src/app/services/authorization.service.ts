import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private jwtHelper:JwtHelperService) { }

  private _isAuthenticated:boolean;

  getDecodedToken(){
    const token = this.getToken();
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }


  checkToken(){
    const token=this.getToken();
    let isExpired:Boolean
    try {
      isExpired = this.jwtHelper.isTokenExpired(token)
    } catch {
      isExpired = true
    }
    this._isAuthenticated = token != null && !isExpired
  }

  get isAuthenticated() {
    return this._isAuthenticated
  }
}
