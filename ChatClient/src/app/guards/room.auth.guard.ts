import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class RoomAuthGuard implements CanActivateChild {
  constructor(private authorizationService: AuthorizationService, private router: Router, private roomService:RoomService) { }
  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      let roomId=childRoute.params['roomName'];
      let room=await this.roomService.listById(roomId)

      console.log(room)


      if(room!=null&& room.isPrivate){
        this.authorizationService.checkToken()

        let roles=this.authorizationService.getDecodedToken()["roles"]

        if(!this.findRole(roles,`host-${roomId}`) && !this.findRole(roles,`guest-${roomId}`)) {
          this.router.navigate(["/"])
          return false;
        }

      }

      return true
  }


  findRole(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return true;
      }
    }
    return false;
  }


}
