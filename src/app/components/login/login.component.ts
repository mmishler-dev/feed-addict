import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  emailLabel = 'Email';
  emailPlaceholder = 'Email';

  passwordLabel = 'Password';
  passwordPlaceholder = 'Password';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe((result: any) => {
        const token = JSON.parse(result).token;
        localStorage.setItem('token', JSON.stringify(token));
        this.authService.setUserLogggedIn(true);
        window.location.href = '';
      }, (error) => {
        this.errorMessage = 'Invalid username/password';
        this.authService.setUserLogggedIn(false);
      });
    }
  }

  redirectNewUser() {
    this.router.navigateByUrl('/signup');
  }

}
