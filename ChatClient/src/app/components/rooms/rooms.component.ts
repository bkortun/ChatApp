import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomService } from 'src/app/services/room.service';
import { RoomList } from 'src/app/models/RoomModels/roomList';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  bsModalRef: BsModalRef
  rooms:RoomList[]=[]

  constructor(private modalService: BsModalService, private roomService:RoomService) { }
  roomName: string
  ngOnInit(): void {
    this.getRooms();
  }

  openModal() {
    this.bsModalRef = this.modalService.show(CreateRoomComponent);
    this.bsModalRef.onHidden.subscribe(()=>{
      this.getRooms()
    })
  }

  async getRooms(){
    this.rooms=await this.roomService.list();
  }
}
