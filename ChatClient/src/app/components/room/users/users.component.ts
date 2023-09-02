import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private messageService:MessageService, private authorizationService:AuthorizationService) { }

  clients:Client[]

  async ngOnInit() {

    await this.messageService.checkConnectionStatusRecursive()

    this.sendUsername();
    this.messageService.connection.on('ListClients',(clients:Client[])=>{
      this.clients=clients
    })
  }

  sendUsername(){
    const decodeToken=this.authorizationService.getDecodedToken();
    if(decodeToken["userName"]!=""){
      this.messageService.setConnectionToUser(decodeToken["username"],decodeToken["id"]);
      this.getClients();
    }
  }

  async getClients(){
   this.clients= await this.messageService.getClientsList();
  }

  ngOnDestroy(): void {
    const decodeToken=this.authorizationService.getDecodedToken();
    if(decodeToken["userName"]!=""){
      this.messageService.removeConnectionToUser(decodeToken["id"]);
    }

  }
}
