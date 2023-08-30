import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { RoomsComponent } from './components/rooms/rooms.component';

const routes: Routes = [
  {path:"rooms",component:RoomsComponent},
  {path:"",loadChildren:()=>import("../app/components/room/room.module").then(module=>module.RoomModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
