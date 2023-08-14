import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private connection:HubConnection
  private messageSubject: Subject<string> = new Subject<string>();
  private connectionStatus:ConnectionStatus=ConnectionStatus.Connecting

  constructor() {
    this.connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7149/messages")
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

  getConnectionStatus():ConnectionStatus{
    return this.connectionStatus;
  }
}

export enum ConnectionStatus{
  Failed,
  Connecting,
  Connected
}
