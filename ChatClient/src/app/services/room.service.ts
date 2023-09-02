import { Injectable } from '@angular/core';
import { RoomAdd } from '../models/RoomModels/roomAdd';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { RoomList } from '../models/RoomModels/roomList';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl:string="https://localhost:7149"

  constructor(private httpClient:HttpClient) { }

  create(room:RoomAdd,token){
    this.httpClient.post(`${this.baseUrl}/api/rooms`,room).subscribe(r=>console.log(r))
  }

  async list():Promise<RoomList[]>{
    const observable:Observable<RoomList[]> =this.httpClient.get<RoomList[]>(`${this.baseUrl}/api/rooms`)
    return await firstValueFrom(observable) as RoomList[]
  }

}
