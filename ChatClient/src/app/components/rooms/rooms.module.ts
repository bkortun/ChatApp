import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RoomsComponent,
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomsModule { }
