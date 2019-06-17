import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private authService: AuthService
  ) {}

  login() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      try {
          this.authService.login(email, password).subscribe((result) => {
            console.log(result);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

}
