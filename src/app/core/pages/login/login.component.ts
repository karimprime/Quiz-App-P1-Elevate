import { Component, inject, signal, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false); // Signal to manage password visibility

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
    ]),
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value); // Toggle the value
  }

  private loginSub!: Subscription;

  LoginSubmit(): void {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid || this.isLoading()) return;

    this.isLoading.set(true); // Set loading state
    this.apiError.set(''); // Clear previous errors

    this.loginSub = this._authApiService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if ('token' in res && res.message === 'success') {
          localStorage.setItem('userToken', res.token);
          this._router.navigate(['/dashboard']); // Redirect to dashboard or desired route
          console.log('Login success', res);
        } else {
          this.apiError.set('Invalid response from server.'); // Handle unexpected response
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.apiError.set(err.error?.message || 'Login failed. Please try again.'); // Set error message
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
