import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoomComponent } from './create-room/create-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  bsModalRef:BsModalRef

  constructor(private modalService:BsModalService) { }
  roomName:string
  ngOnInit(): void {

  }

  openModal() {
    this.bsModalRef = this.modalService.show(CreateRoomComponent);
}
}
