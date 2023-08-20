import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  username=""
  clients:Client[]

  ngOnInit(): void {
    this.messageService.connection.on('ListClients',(clients:Client[])=>{
      this.clients=clients
    })
  }

  sendUsername(){
    if(this.username!=""){
      this.messageService.setConnectionToUser(this.username);
      this.getClients();
    }
  }

  async getClients(){
   this.clients= await this.messageService.getClientsList();
  }
}
