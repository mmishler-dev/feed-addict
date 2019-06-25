import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  userLoggedIn = false;
  userHasToken = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userLoggedIn = this.authService.isUserLoggedIn();
    this.userHasToken = this.authService.userHasToken();

    switch (state.url) {
      case '/': {
        if (!(this.userLoggedIn && this.userHasToken)) {
          this.router.navigateByUrl('/login');
          return false;
        } else {
          return true;
        }
      }
      case '/login':
      case '/signup': {
        if (this.userLoggedIn && this.userHasToken) {
          this.router.navigateByUrl('/');
          return false;
        } else {
          return true;
        }
      }
    }
  }
}
