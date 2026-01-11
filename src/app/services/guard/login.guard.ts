import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,GuardResult,MaybeAsync,Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate{
  constructor(
    private userService:UserService,
    private router: Router
  ){}

  canActivate(): boolean {
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
