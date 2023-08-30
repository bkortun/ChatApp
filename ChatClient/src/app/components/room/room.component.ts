import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private messageService:MessageService, private route:ActivatedRoute, private spinner:NgxSpinnerService) { }


  roomName:string

  ngOnInit(): void {
    this.spinner.show("pulse");
    setTimeout(() => this.spinner.hide("pulse"), 1000);
    this.roomName=this.route.snapshot.paramMap.get("roomName");
  }

}
