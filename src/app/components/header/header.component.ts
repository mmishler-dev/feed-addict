import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;

  constructor(
    private authService: AuthService
  ) {
    this.authService.loginState$.subscribe((userLoggedIn) => {
      this.userLoggedIn = userLoggedIn;
    });
  }

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }
}
