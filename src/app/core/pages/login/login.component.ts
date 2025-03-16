import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AuthApiElevateService } from 'auth-api-elevate';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly _authApiElevateService = inject(AuthApiElevateService);
  private readonly _authService = inject(AuthService);

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
    ]),
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  private loginSub!: Subscription;

  LoginSubmit(): void {
    if (this.loginForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set('');

    this.loginSub = this._authApiElevateService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if ('token' in res && res.message === 'success') {
          this._authService.userData.next(res); // Trigger token storage in AuthService
          console.log('Login success', res);
        } else {
          this.apiError.set('Invalid response from server.');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.apiError.set(err.error?.message || 'Login failed. Please try again.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
