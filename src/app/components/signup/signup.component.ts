import { Component, OnInit } from '@angular/core';
import { SignupConstants } from './signup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateMultiple } from 'custom-validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'fa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  /**
   * first name constants
   */
  firstNameLabel = SignupConstants.firstName;
  firstNamePlaceholder = SignupConstants.firstName;

  /**
   * last name constants
   */
  lastNameLabel = SignupConstants.lastName;
  lastNamePlaceholder = SignupConstants.lastName;

  /**
   * email constants
   */
  emailLabel = SignupConstants.email;
  emailPlaceholder = SignupConstants.email;

  /**
   * password constants
   */
  passwordLabel = SignupConstants.password;
  passwordPlaceholder = SignupConstants.password;

  errorMessage = '';

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value)
        .subscribe(() => {
          this.errorMessage = '';
          this.openSuccessDialog();
        }, (errResponse) => {
          this.errorMessage = errResponse.error.message;
        });
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(SuccessModalComponent, {
      height: '200px',
      width: '350px',
      data: {
        first: this.signupForm.value.first,
          last: this.signupForm.value.last
      }
    });
  }
}
