import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  getDecodedToken(){
    const token = this.getToken();
    const decodedToken = jwt_decode(token);
    console.log(decodedToken)
    return decodedToken;
  }

  getToken(){
    const token = localStorage.getItem('token');
    console.log(token);
    return token;
  }
}
