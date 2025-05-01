import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthApiKpService } from 'auth-api-kp';

import { Store } from '@ngrx/store';

import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";
import { loginFailure, loginSuccess } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  private readonly _store = inject(Store);

  apiError = signal<string>('');
  isLoading = signal<boolean>(false);

  showPassword = signal<boolean>(false);
  isPopoverVisible = signal<boolean>(false);

  isEmailPopoverVisible = signal<boolean>(false);

  strengthLevel = signal<number>(0);
  isMinLengthMet = signal<boolean>(false);
  hasLowercase = signal<boolean>(false);
  hasUppercase = signal<boolean>(false);
  hasNumber = signal<boolean>(false);
  hasSpecialChar = signal<boolean>(false);

  showEmailPopover(): void {
    this.isEmailPopoverVisible.set(true);
  }

  hideEmailPopover(): void {
    this.isEmailPopoverVisible.set(false);
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
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

    this.loginSub = this._authApiKpService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if ('token' in res && res.message === 'success') {
          this._store.dispatch(loginSuccess({ token: res.token }));
          this._router.navigate(['/dashboard/home']);
        } else {
          this.apiError.set('Email or Password is incorrect!');
          this._store.dispatch(loginFailure({ error: this.apiError() }));
        }
      },
      error: (err) => {
        this._store.dispatch(loginFailure({ error: 'Email or Password is incorrect!' }));
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
