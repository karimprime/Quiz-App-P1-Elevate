
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { AuthApiKpService } from 'auth-api-kp';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnDestroy {
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  private verifySub!: Subscription;

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);

  verifyCodeForm = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });

  verifyCodeSubmit(): void {
    if (this.verifyCodeForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set('');

    const email = sessionStorage.getItem('resetEmail');
    if (!email) {
      this.apiError.set('Email not found. Please start the forgot password process again.');
      this.isLoading.set(false);
      return;
    }

    const data = { email, resetCode: this.verifyCodeForm.get('resetCode')?.value };

    this.verifySub = this._authApiKpService.verifyCode(data).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        if (res && res.status === 'Success') {
          this._notificationService.success('Code verified successfully!');
          this._router.navigate(['/auth-layout/set-password']);
        } else {
          this.apiError.set('Invalid verification code. Please try again.');
          this._notificationService.error('Invalid code.');
        }
      },
      error: (err) => {
        console.error('Verify code request failed', err);
        this.apiError.set('An error occurred. Please try again.');
        this._notificationService.error('Could not verify code. Please try again.');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.verifySub) {
      this.verifySub.unsubscribe();
    }
  }
}
