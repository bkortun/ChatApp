import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/services/message.service';
import { ExitRoomComponent } from './exit-room/exit-room.component';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private messageService: MessageService,private modalService: BsModalService,
    private route:ActivatedRoute, private spinner:NgxSpinnerService, private alertifyService:AlertifyService) { }

  bsModalRef: BsModalRef;
  roomName:string

  ngOnInit(): void {
    this.spinner.show("pulse");
    setTimeout(() => this.spinner.hide("pulse"), 1000);
    this.roomName=this.route.snapshot.paramMap.get("roomName");

    this.messageService.connection.on('ReceiveAlertMessage', (username:string)=>{
          this.alertifyService.message(`${username} joined`,{position:AlertifyPosition.BottomRight,messageType:AlertifyMessageType.Success})
    })
  }

  openModal() {
    this.bsModalRef = this.modalService.show(ExitRoomComponent);
  }

}
