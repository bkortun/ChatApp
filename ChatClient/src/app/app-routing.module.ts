import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"rooms",component:RoomsComponent},
  {path:"",loadChildren:()=>import("../app/components/room/room.module").then(module=>module.RoomModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
