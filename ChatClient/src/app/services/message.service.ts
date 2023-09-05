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
        this.connection.on('ListClients',(clients:Client[])=>{
          this.clients=clients
        })
    }).catch(err => console.error('Error while starting SignalR connection:', err));



   }

   async checkConnectionStatusRecursive(): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        if (this.connection.state === 'Connected') {
          console.log('SignalR bağlantısı hala açık.');
          resolve();
        } else {
          console.warn('SignalR bağlantısı kapatıldı veya hala kurulmamış.');
          this.checkConnectionStatusRecursive().then(() => resolve());
        }
      }, 1000);
    });
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

   sendMessage(message:string,userId:string,groupName){
    this.connection.invoke("SendAsync",message,userId,groupName).catch(error=>console.log(error))
   }

   getMessageObservable(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  async setConnectionToUser(username:string,userId:string,groupName:string){
    this.connection.invoke("AddClientAsync",username,userId,groupName)
  }

  async removeConnectionToUser(userId:string){
    this.connection.invoke("RemoveClientAsync",userId)
  }

  async getClientsList(groupName:string):Promise<Client[]>{
    await this.connection.invoke("ListClientsAsync",groupName)
    return this.clients;
  }


}

