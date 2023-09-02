import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoomService } from 'src/app/services/room.service';
import { RoomAdd } from 'src/app/models/RoomModels/roomAdd';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  roomName=""

  constructor(public bsModalRef: BsModalRef, private roomService:RoomService,private authorizationService:AuthorizationService) {

  }

  ngOnInit(): void { }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  createRoom() {
    const token=this.authorizationService.getToken();
    const decodedToken=this.authorizationService.getDecodedToken();
    let room:RoomAdd={
      name:this.roomName,
      hostId:decodedToken["id"]
    }
    console.log(room)
    this.roomService.create(room,token)
    this.bsModalRef.hide();
  }

}

