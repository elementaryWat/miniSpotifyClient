import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(private userService:UserService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if(this.userService.currentUser.role=='ADMIN'){
      return true
    }else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}

