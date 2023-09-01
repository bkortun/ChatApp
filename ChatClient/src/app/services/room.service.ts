import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl:string="https://localhost:7149"

  constructor(private httpClient:HttpClient) { }

  create(room:Room,token){
    this.httpClient.post(`${this.baseUrl}/api/rooms`,room).subscribe(r=>console.log(r))
  }


}
