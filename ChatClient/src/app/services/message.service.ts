import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Client } from '../models/client';
import { Message } from '../models/message';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public connection:HubConnection
  private messageSubject: Subject<Message> = new Subject<Message>();
  private baseUrl:string="https://localhost:7149"

  private clients:Client[]
  constructor(private httpClient: HttpClient) {
    this.connection = new HubConnectionBuilder()
    .withUrl(`${this.baseUrl}/messages`)
    .withAutomaticReconnect()
    .build()

    this.startAsync().then(()=>{
        this.connection.on('ReceiveMessage', (message: string, client:Client) => {
          let clientsMessage:Message={message:message,client:client}
          this.messageSubject.next(clientsMessage);
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

    // this.connection.onreconnecting(()=>this.connectionStatus=ConnectionStatus.Connecting)
    // this.connection.onclose(()=>this.connectionStatus=ConnectionStatus.Failed)
    // this.connection.onreconnected(()=>this.connectionStatus=ConnectionStatus.Connected)
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

   getMessageObservable(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  async setConnectionToUser(username:string){
    this.connection.invoke("AddClientAsync",username)
  }

  async getClientsList():Promise<Client[]>{
    await this.connection.invoke("ListClientsAsync")
    return this.clients;
  }


}

