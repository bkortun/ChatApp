import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-exit-room',
  templateUrl: './exit-room.component.html',
  styleUrls: ['./exit-room.component.css']
})
export class ExitRoomComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private router:Router) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  exitToRoom(){
    this.router.navigate(["/rooms"]);
    this.closeModal();
  }

}
