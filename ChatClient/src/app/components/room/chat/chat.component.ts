import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private messageService:MessageService,private authorizationService:AuthorizationService,
    private activatedRoute:ActivatedRoute) { }

  message:string=""
  receivedMessages:string[]=[]
  roomName=""

  ngOnInit(): void {
    this.roomName=this.activatedRoute.snapshot.paramMap.get("roomName");
    this.messageService.getMessageObservable().subscribe(message => {
      if(message.client.connectionId==this.messageService.connection.connectionId)
        this.receivedMessages.push(`YOU: ${message.message}`)
      else
        this.receivedMessages.push(`${message.client.username.toUpperCase()}: ${message.message}`)
    });
  }

  sendMessage(){
    const decodedToken= this.authorizationService.getDecodedToken();
    if(this.message && this.message!="")
      this.messageService.sendMessage(this.message,decodedToken["id"],this.roomName);
    this.message="";
  }

}
