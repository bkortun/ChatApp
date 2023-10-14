import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-exit-room',
  templateUrl: './exit-room.component.html',
  styleUrls: ['./exit-room.component.css']
})
export class ExitRoomComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  exitToRoom(){
    this.messageService.connection.stop();
    this.router.navigate(["/rooms"]);
    this.closeModal();
  }

}
