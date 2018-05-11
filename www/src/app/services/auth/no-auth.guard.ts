import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (!this.authService.isAuthenticated()) {
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate([''], {});
      return false;
    }
}
