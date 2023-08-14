import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RoomComponent } from './room.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    UsersComponent,
    ChatComponent,
    RoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RoomModule { }
