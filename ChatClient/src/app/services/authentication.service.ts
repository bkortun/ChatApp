import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignUp } from '../models/userModels/userSignUp';
import { UserLogin } from '../models/userModels/userLogin';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from '../models/userModels/token';
import { RefreshLogin } from '../models/userModels/refreshLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl:string="https://localhost:7149"

  constructor(private httpClient:HttpClient) { }

  async signUp(user:UserSignUp):Promise<Token>{
    const observable:Observable<Token>=this.httpClient.post<Token>(`${this.baseUrl}/api/auth/SignIn`,user)
    return await firstValueFrom(observable) as Token
  }

  async login(user:UserLogin):Promise<Token>{
    const observable:Observable<Token>= this.httpClient.post<Token>(`${this.baseUrl}/api/auth/Login`,user)
    return await firstValueFrom(observable) as Token
  }

  async refreshLogin(user:RefreshLogin):Promise<Token>{
    const observable:Observable<Token>= this.httpClient.post<Token>(`${this.baseUrl}/api/auth/RefreshLogin`,user)
    return await firstValueFrom(observable) as Token
  }
}
