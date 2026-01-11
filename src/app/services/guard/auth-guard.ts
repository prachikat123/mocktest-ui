import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router, GuardResult, MaybeAsync } from '@angular/router';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn:'root',
})

export class AuthGuard implements CanActivate{
  constructor(
    private userService: UserService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.userService.isLoggedIn()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
    
  
}
