
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthApiKpService } from 'auth-api-kp';
import { NotificationService } from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  private forgetSub!: Subscription;

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  forgetpasswordSubmit(): void {
    if (this.forgetPasswordForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set('');
    const email = this.forgetPasswordForm.get('email')?.value ?? '';

    if (email) {
      sessionStorage.setItem('resetEmail', email);
    }

    this.forgetSub = this._authApiKpService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next: (res) => {
        if (res && res.message === 'success') {
          this._notificationService.success('Verification code sent! Check your email!');
          this._router.navigate(['/auth-layout/verify-code']);
        } else {
          this.apiError.set('Failed to send verification code. Please try again.');
          this._notificationService.error('Invalid email or server error.');
        }
      },
      error: (err) => {
        console.error('Forgot password request failed', err);
        this.apiError.set('An error occurred. Please try again.');
        this._notificationService.error(this.apiError());

      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.forgetSub) {
      this.forgetSub.unsubscribe();
    }
  }
}
