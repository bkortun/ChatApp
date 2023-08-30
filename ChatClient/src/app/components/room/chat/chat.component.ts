import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/models/client';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  message:string=""
  receivedMessages:string[]=[]

  ngOnInit(): void {
    this.messageService.getMessageObservable().subscribe(message => {
      if(message.client.connectionId==this.messageService.connection.connectionId)
        this.receivedMessages.push(`YOU: ${message.message}`)
      else
        this.receivedMessages.push(`${message.client.username.toUpperCase()}: ${message.message}`)
    });
  }

  sendMessage(){
    if(this.message && this.message!="")
      this.messageService.sendMessage(this.message)
    this.message=""
  }

}
