import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public connection:HubConnection
  private messageSubject: Subject<string> = new Subject<string>();
  private connectionStatus:ConnectionStatus=ConnectionStatus.Connecting
  private baseUrl:string="https://localhost:7149"

  private clients:Client[]
  constructor(private httpClient: HttpClient) {
    this.connection = new HubConnectionBuilder()
    .withUrl(`${this.baseUrl}/messages`)
    .withAutomaticReconnect()
    .build()

    this.startAsync().then(()=>{
        this.connection.on('ReceiveMessage', (message: string) => {
          this.messageSubject.next(message);
        })
        this.connection.on('ClientJoined',(connectionId)=>{
          console.log(`${connectionId} joined`)
        })
        this.connection.on('ClientLeft',(connectionId)=>{
          console.log(`${connectionId} left`)
        })
        this.connection.on('ListClients',(clients:Client[])=>{
          this.clients=clients
        })
    }).catch(err => console.error('Error while starting SignalR connection:', err));

    this.connection.onreconnecting(()=>this.connectionStatus=ConnectionStatus.Connecting)
    this.connection.onclose(()=>this.connectionStatus=ConnectionStatus.Failed)
    this.connection.onreconnected(()=>this.connectionStatus=ConnectionStatus.Connected)
    //TODO bu çıktıları ekrana veremedim

   }

   private async startAsync():Promise<void>{
    try{
     return await this.connection.start()
    }catch(error){
      setTimeout(() => {
        this.startAsync()
      }, 2000);
    }
   }

   sendMessage(message:string){
    this.connection.invoke("SendAsync",message).catch(error=>console.log(error))
   }

   getMessageObservable(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  /*addToGroup(){
    this.httpClient.post(`${this.baseUrl}/api/messages/addToGroup`)
  }

  removeToGroup(){
    this.httpClient.post(`${this.baseUrl}/api/messages/removeToGroup`)
  }*/

  async setConnectionToUser(username:string){
    this.connection.invoke("AddClientAsync",username)
  }

  async getClientsList():Promise<Client[]>{
    await this.connection.invoke("ListClientsAsync")
    return this.clients;
  }

  getConnectionStatus():ConnectionStatus{
    return this.connectionStatus;
  }
}

export enum ConnectionStatus{
  Failed,
  Connecting,
  Connected
}
