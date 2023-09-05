import { Injectable } from '@angular/core';
import { RoomAdd } from '../models/RoomModels/roomAdd';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { RoomList } from '../models/RoomModels/roomList';
import { CheckPasswordResponse } from '../models/RoomModels/checkPasswordResponse';
import { CheckPasswordRequest } from '../models/RoomModels/checkPasswordRequest';
import { Token } from '../models/userModels/token';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl:string="https://localhost:7149"

  constructor(private httpClient:HttpClient) { }

  create(room:RoomAdd){
    this.httpClient.post(`${this.baseUrl}/api/rooms`,room).subscribe()
  }

  async list():Promise<RoomList[]>{
    const observable:Observable<RoomList[]> =this.httpClient.get<RoomList[]>(`${this.baseUrl}/api/rooms`)
    return await firstValueFrom(observable) as RoomList[]
  }

  async listById(id:string):Promise<RoomList>{
    const observable:Observable<RoomList> =this.httpClient.get<RoomList>(`${this.baseUrl}/api/rooms/${id}`)
    return await firstValueFrom(observable) as RoomList
  }

  async checkPassword(body:CheckPasswordRequest):Promise<Token>{
    const observable:Observable<Token> =this.httpClient.post<Token>(`${this.baseUrl}/api/rooms/checkPassword`,body)
    return await firstValueFrom(observable) as Token
  }

}
