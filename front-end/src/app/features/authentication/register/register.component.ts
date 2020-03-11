import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import Swal from 'sweetalert2';

import emailCustomValidator from '../../../core/validators/is-email';
import { AuthService } from '../../../core/services/auth.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { RegistrationValidator } from '../../../core/validators/compare-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public passwordFormGroup: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly fb: FormBuilder
  ) {
    this.passwordFormGroup = this.fb.group(
      {
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        repeatPassword: ['', Validators.required],
      },
      {
        validator: RegistrationValidator.validate.bind(this),
      }
    );

    this.registerForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      email: ['', [Validators.required, emailCustomValidator()]],
      password: this.passwordFormGroup.value.password,
    });
  }

  public register() {
    if (this.registerForm.invalid) {
      return;
    }
    const user = {
      ...this.registerForm.value,
      password: this.passwordFormGroup.value.password,
    };
    this.authService.register(user).subscribe(
      () => {
        Swal.fire({
          title: 'Register successful!',
          text: 'Welcome to Huggo!',
          type: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.authService
          .login({ usernameOrEmail: user.username, password: user.password })
          .toPromise();
      },
      (errorResponse: HttpErrorResponse) => {
        this.notificator.error(errorResponse.error.error);
      }
    );
  }
}
