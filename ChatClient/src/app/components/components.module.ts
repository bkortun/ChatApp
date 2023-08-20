import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModule } from './room/room.module';
import { RoomsModule } from './rooms/rooms.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoomModule,
    RoomsModule
  ]
})
export class ComponentsModule { }
