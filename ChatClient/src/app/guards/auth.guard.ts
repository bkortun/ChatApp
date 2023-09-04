import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authorizationService.checkToken()
    if (!this.authorizationService.isAuthenticated || this.authorizationService.getToken() == null) {
      this.router.navigate(["/"], {
        queryParams: { returnUrl: state.url }
      })
      console.log(this.authorizationService.isAuthenticated)
      console.log(this.authorizationService.getToken())
      console.log("not ok")
      return false;
    }
    console.log("ok")
    return true
  }

}
