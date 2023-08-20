import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
  }



  addToGroup(){
   // this.messageService.addToGroup()
  }

}
