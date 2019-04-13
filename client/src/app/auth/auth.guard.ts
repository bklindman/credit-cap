import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(private authService: AuthenticationService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let loggedIn = this.authService.isAuthenticated();
    let reverseAuthRoutes = ['/login', '/'];
    if(loggedIn && reverseAuthRoutes.includes(state.url)){
      this.router.navigate(['/dashboard']);
      return false;
    } else if(loggedIn || reverseAuthRoutes.includes(state.url)){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
