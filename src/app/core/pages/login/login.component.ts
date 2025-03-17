import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { AuthApiKPService } from 'AuthApi-KP';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _authApiKPService = inject(AuthApiKPService);
  private readonly _authService = inject(AuthService);
  private readonly _notificationService = inject(NotificationService);

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  isPopoverVisible = signal<boolean>(false);
  strengthLevel = signal<number>(0);
  isMinLengthMet = signal<boolean>(false);
  hasLowercase = signal<boolean>(false);
  hasUppercase = signal<boolean>(false);
  hasNumber = signal<boolean>(false);
  hasSpecialChar = signal<boolean>(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
    ]),
  });

  private loginSub!: Subscription;

  ngOnInit(): void {
    this.loginForm.get('password')?.valueChanges.subscribe((value) => {
      this.updatePasswordStrength(value);
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  showPopover(): void {
    this.isPopoverVisible.set(true);
  }

  hidePopover(): void {
    this.isPopoverVisible.set(false);
  }

  updatePasswordStrength(password: string): void {
    const isMinLengthMet = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    this.isMinLengthMet.set(isMinLengthMet);
    this.hasLowercase.set(hasLowercase);
    this.hasUppercase.set(hasUppercase);
    this.hasNumber.set(hasNumber);
    this.hasSpecialChar.set(hasSpecialChar);

    const points = [
      isMinLengthMet,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
    ].filter(Boolean).length;

    this.strengthLevel.set(points);
  }

  LoginSubmit(): void {
    if (this.loginForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set('');

    this.loginSub = this._authApiKPService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if ('token' in res && res.message === 'success') {
          this._authService.userData.next(res);
          console.log('Login success', res);
          this._notificationService.success('Login successful!');
        } else {
          this.apiError.set('Invalid response from server.');
          this._notificationService.error('Email or Password is incorrect!');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this._notificationService.error('Email or Password is incorrect!');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
