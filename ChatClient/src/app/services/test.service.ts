import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient:HttpClient) { }

  senMessage(){
    console.log("work")
    this.httpClient.get("https://localhost:7149/api/messages/deneme")
  }

  getData(): Observable<any> {
    const url = "https://localhost:7149/api/messages/deneme"; // İstek atılacak URL
    return this.httpClient.get(url);
  }
}
