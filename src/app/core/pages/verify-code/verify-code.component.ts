import { Component, EventEmitter, Input, Output, inject, signal, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { AuthApiKpService } from 'auth-api-kp';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnDestroy {
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _notificationService = inject(NotificationService);

  @Input() email: string = '';
  @Output() codeVerified = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  // Form and validation
  currentPopover: string | null = null;
  verifyCodeForm = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/)
    ]),
  });

  // State signals
  apiError = signal<string>('');
  isLoading = signal<boolean>(false);
  isResending = signal<boolean>(false);
  resendSuccess = signal<boolean>(false);
  cooldownSeconds = signal<number>(0);

  // Subscriptions
  private verifySub!: Subscription;
  private resendSub!: Subscription;
  private timerSub!: Subscription;

  // Timer methods
  startCooldownTimer(): void {
    this.cooldownSeconds.set(30);
    this.timerSub = interval(1000).subscribe(() => {
      if (this.cooldownSeconds() > 0) {
        this.cooldownSeconds.update(val => val - 1);
      } else {
        this.timerSub?.unsubscribe();
      }
    });
  }

  // Popover methods
  showPopover(field: string): void {
    this.currentPopover = field;
  }

  hidePopover(): void {
    this.currentPopover = null;
  }

  isPopoverVisibleFor(field: string): boolean {
    return this.currentPopover === field;
  }

  // Resend verification code
  resendVerificationCode(): void {
    if (this.isResending() || this.cooldownSeconds() > 0) return;

    this.isResending.set(true);
    this.resendSuccess.set(false);
    this.apiError.set('');

    this.resendSub = this._authApiKpService.forgetPassword({ email: this.email }).subscribe({
      next: (res) => {
        if (res && res.message === 'success') {
          this._notificationService.success('New verification code sent!');
          this.resendSuccess.set(true);
          this.startCooldownTimer();
        } else {
          this.apiError.set('Failed to resend verification code. Please try again.');
          this._notificationService.error('Failed to resend code.');
        }
      },
      error: (err) => {
        console.error('Resend code request failed', err);
        this.apiError.set(err.error?.message || 'An error occurred. Please try again.');
        this._notificationService.error(this.apiError());
      },
      complete: () => {
        this.isResending.set(false);
      }
    });
  }

  // Verify code submission
  verifyCodeSubmit(): void {
    if (this.verifyCodeForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set('');

    const data = { email: this.email, resetCode: this.verifyCodeForm.get('resetCode')?.value };

    this.verifySub = this._authApiKpService.verifyCode(data).subscribe({
      next: (res) => {
        if (res && res.status === 'Success') {
          this._notificationService.success('Code verified successfully!');
          this.codeVerified.emit();
        } else {
          this.apiError.set('Invalid verification code. Please try again.');
          this._notificationService.error('Invalid code.');
        }
      },
      error: (err) => {
        console.error('Verify code request failed', err);
        this.apiError.set(err.error?.message || 'An error occurred. Please try again.');
        this._notificationService.error(this.apiError());
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.verifySub?.unsubscribe();
    this.resendSub?.unsubscribe();
    this.timerSub?.unsubscribe();
  }
}
