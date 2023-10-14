import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomService } from 'src/app/services/room.service';
import { RoomList } from 'src/app/models/RoomModels/roomList';
import { Router } from '@angular/router';
import { CheckPasswordRequest } from 'src/app/models/RoomModels/checkPasswordRequest';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Token } from 'src/app/models/userModels/token';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  bsModalRef: BsModalRef;
  rooms:RoomList[]=[];
  roomPassword="";

  constructor(private modalService: BsModalService, private roomService:RoomService, private router:Router,
    private authorizationService:AuthorizationService) { }
  roomName: string
  ngOnInit(): void {
    this.getRooms();
    setInterval(() => {
      this.getRooms();
    }, 5000);
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

  async join(room:RoomList){
    if(room.isPrivate){
      let requestBody:CheckPasswordRequest={
        password:this.roomPassword,
        roomId:room.id,
        userId:this.authorizationService.getDecodedToken()["id"]
      };
      let token:Token= await this.roomService.checkPassword(requestBody);
      console.log(this.authorizationService.getDecodedToken())
      localStorage.setItem("token",token.authToken);
      this.router.navigateByUrl(`/${room.id}`);
    }
    this.router.navigateByUrl(`/${room.id}`);
  }
}
