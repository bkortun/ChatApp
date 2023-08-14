import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConnectionStatus, MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  message:string=""
  receivedMessages:string[]=[]
  @Output() dataEmitter:EventEmitter<any>=new EventEmitter()
  connectionStatus:ConnectionStatus=ConnectionStatus.Connecting

  ngOnInit(): void {
    this.dataEmitter.emit(this.messageService.getConnectionStatus())
    this.messageService.getMessageObservable().subscribe(message => {
      this.receivedMessages.push(message)
    });
  }

  sendMessage(){
    if(this.message && this.message!="")
      this.messageService.sendMessage(this.message)
    this.message=""
  }

}
