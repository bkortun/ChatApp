import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './authentication.service';
import { RefreshLogin } from '../models/userModels/refreshLogin';
import { Token } from '../models/userModels/token';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private jwtHelper: JwtHelperService, private authenticationService: AuthenticationService) { }

  private _isAuthenticated: boolean;

  getDecodedToken() {
    const token = this.getToken();
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }


  checkToken() {
    const token = this.getToken();
    let isExpired: Boolean;
    try {
      isExpired = this.jwtHelper.isTokenExpired(token);
      if (isExpired) {
        this.checkRefreshToken();
      }
    } catch {
      isExpired = true;
    }
    this._isAuthenticated = token != null && !isExpired;
  }

  async checkRefreshToken() {
    let request: RefreshLogin = {
      email: this.getDecodedToken()["email"],
      refreshToken: localStorage.getItem("refreshtoken")
    };
    var token: Token = await this.authenticationService.refreshLogin(request);
    localStorage.setItem("token", token.authToken);
    localStorage.setItem("refreshtoken", token.refreshToken);
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }
}
