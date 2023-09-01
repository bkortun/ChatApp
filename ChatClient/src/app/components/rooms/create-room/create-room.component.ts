import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  roomName=""

  constructor(public bsModalRef: BsModalRef, private roomService:RoomService) {

  }

  ngOnInit(): void { }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  createRoom() {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    console.log(token)
    let room:Room={
      name:this.roomName,
      hostId:decodedToken["id"]
    }
    console.log(room)
    this.roomService.create(room,token)
    this.bsModalRef.hide();
  }

}

