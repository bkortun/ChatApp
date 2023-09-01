import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModule } from './room/room.module';
import { RoomsModule } from './rooms/rooms.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RoomModule,
    RoomsModule,
    SignUpModule,
    LoginModule
  ]
})
export class ComponentsModule { }
