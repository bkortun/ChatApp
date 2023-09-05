import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoomService } from 'src/app/services/room.service';
import { RoomAdd } from 'src/app/models/RoomModels/roomAdd';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  privateFlag=false;
  roomForm:FormGroup;

  constructor(public bsModalRef: BsModalRef, private roomService:RoomService,private authorizationService:AuthorizationService,
    private formBuilder:FormBuilder) {
    this.roomForm=formBuilder.group({
      name:[""],
      isPrivate:["public"],
      description:[""],
      password:[""]
    })
  }

  ngOnInit(): void { }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  createRoom() {
    let isPrivate;
    if(this.roomForm.value["isPrivate"]=="public")
      isPrivate=false;
    else
      isPrivate=true;

    const token=this.authorizationService.getToken();
    const decodedToken=this.authorizationService.getDecodedToken();
    let room:RoomAdd={
      name:this.roomForm.value["name"],
      hostId:isPrivate?decodedToken["id"]:"",
      description:this.roomForm.value["description"],
      isPrivate:isPrivate,
      password:isPrivate?this.roomForm.value["password"]:""
    }
    this.roomService.create(room)
    this.bsModalRef.hide();
  }

  changePrivateFlag(){
    this.privateFlag=!this.privateFlag;
  }

}

