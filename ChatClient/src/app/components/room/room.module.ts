import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RoomComponent } from './room.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersComponent,
    ChatComponent,
    RoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path:":roomName",component:RoomComponent}])
  ]
})
export class RoomModule { }
