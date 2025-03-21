import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthApiKpService } from 'auth-api-kp';
import { NotificationService } from '../../../shared/services/notification/notification.service';


@Component({
  selector: 'app-set-password',
  imports: [ReactiveFormsModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent {
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  isPopoverVisible = signal<boolean>(false);
  strengthLevel = signal<number>(0);
  isMinLengthMet = signal<boolean>(false);
  hasLowercase = signal<boolean>(false);
  hasUppercase = signal<boolean>(false);
  hasNumber = signal<boolean>(false);
  hasSpecialChar = signal<boolean>(false);

  private resetPasswordSub!: Subscription;

  resetPasswordForm: FormGroup = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { validators: this.confirmPassword.bind(this) }
  );

  ngOnInit(): void {
    this.resetPasswordForm.get('newPassword')?.valueChanges.subscribe((value) => {
      this.updatePasswordStrength(value);
    });
  }

  ngOnDestroy(): void {
    if (this.resetPasswordSub) {
      this.resetPasswordSub.unsubscribe();
    }
  }

  updatePasswordStrength(newPassword: string): void {
    const isMinLengthMet = newPassword.length >= 8;
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[@$!%*?&]/.test(newPassword);

    this.isMinLengthMet.set(isMinLengthMet);
    this.hasLowercase.set(hasLowercase);
    this.hasUppercase.set(hasUppercase);
    this.hasNumber.set(hasNumber);
    this.hasSpecialChar.set(hasSpecialChar);

    const points = [isMinLengthMet, hasLowercase, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;
    this.strengthLevel.set(points);
  }

  confirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const rePassword = control.get('rePassword')?.value;
    return newPassword === rePassword ? null : { misMatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((value) => !value);
  }

  showPopover(): void {
    this.isPopoverVisible.set(true);
  }

  hidePopover(): void {
    this.isPopoverVisible.set(false);
  }

  resetPasswordSubmit(): void {
    if (this.resetPasswordForm.invalid || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.apiError.set('');

    const email = sessionStorage.getItem('resetEmail');
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;

    if (!email) {
      this.apiError.set('Email not found. Please try again.');
      this.isLoading.set(false);
      this._notificationService.error('Email not found. Please try again.');
      return;
    }

    const resetData = { email, newPassword };

    this.resetPasswordSub = this._authApiKpService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this._notificationService.success('Password reset successfully!');
        sessionStorage.removeItem('resetEmail');
        this._router.navigate(['/auth-layout/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.apiError.set(err.error?.message || 'Failed to reset password. Please try again.');
        this._notificationService.error(this.apiError());
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
