import { Component, OnInit } from '@angular/core';
import { ConnectionStatus, MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private messageService:MessageService) { }
  connectionStatus: string = ""

  ngOnInit(): void {
  }

  getConnectionStatus(data: any) {
    console.log(data)
    switch (data) {
      case ConnectionStatus.Failed:
        this.connectionStatus = "Failed"
        break;
      case ConnectionStatus.Connected:
        this.connectionStatus = "Connected"
        break;
      case ConnectionStatus.Connecting:
        this.connectionStatus = "Connecting"
        break;
      default:
        break;
    }
  }

  removeToGroup(){
    //this.messageService.removeToGroup()
  }

}
