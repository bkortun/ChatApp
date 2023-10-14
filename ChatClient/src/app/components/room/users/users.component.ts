import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MessageService } from 'src/app/services/message.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private messageService: MessageService, private authorizationService: AuthorizationService,
    private activatedRoute:ActivatedRoute) {

  }
  roomName=""
  clients: Client[]

  async ngOnInit() {
    this.roomName=this.activatedRoute.snapshot.paramMap.get("roomName");
    await this.messageService.checkConnectionStatusRecursive()

    this.sendUsername();
    this.messageService.connection.on('ListClients', (clients: Client[]) => {
      console.log(clients)
      this.clients = clients
    })

  }

  sendUsername() {
    const decodedToken = this.authorizationService.getDecodedToken();
    if (decodedToken["userName"] != "") {
      this.messageService.setConnectionToUser(decodedToken["username"], decodedToken["id"],this.roomName);
      this.getClients();
    }
  }

  async getClients() {
    this.clients = await this.messageService.getClientsList(this.roomName);
  }

}
