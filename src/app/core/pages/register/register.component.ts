import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthApiKpService } from 'auth-api-kp';

import { NotificationService } from '../../../shared/services/notification/notification.service';
import { registerFailure, registerSuccess } from '../../../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly _authApiKpService = inject(AuthApiKpService);
    private readonly _store = inject(Store);
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

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(01)[0125][0-9]{8}$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { validators: this.confirmPassword.bind(this) }
  );

  private registerSub!: Subscription;

  ngOnInit(): void {
    this.registerForm.get('password')?.valueChanges.subscribe((value) => {
      this.updatePasswordStrength(value);
    });
  }

  ngOnDestroy(): void {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
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

    const points = [isMinLengthMet, hasLowercase, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;
    this.strengthLevel.set(points);
  }

  confirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { misMatch: true };
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

  RegisterSubmit(): void {
    if (this.registerForm.invalid) return;
    this.isLoading.set(true);
    this.apiError.set('');

    this.registerSub = this._authApiKpService.register(this.registerForm.value).subscribe({

        next: (res) => {
              if ('token' in res && res.message === 'success') {
                this._store.dispatch(registerSuccess(res));
                this._router.navigate(['/auth-layout/login']);
              } else {
                this.apiError.set('Registration failed. Please check your details and try again.');
                this._store.dispatch(registerFailure({ error: this.apiError() }));
              }
            },
            error: (err) => {
              this._store.dispatch(registerFailure({ error: 'Registration failed. Please check your details and try again.' }));
            },
            complete: () => {
              this.isLoading.set(false);
            },
          });
        }
}
