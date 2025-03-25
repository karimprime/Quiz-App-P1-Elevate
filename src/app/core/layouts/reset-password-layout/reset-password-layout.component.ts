import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from "../../pages/forget-password/forget-password.component";
import { VerifyCodeComponent } from "../../pages/verify-code/verify-code.component";
import { SetPasswordComponent } from "../../pages/set-password/set-password.component";

@Component({
  selector: 'app-reset-password-layout',
  imports: [CommonModule, ForgetPasswordComponent, VerifyCodeComponent, SetPasswordComponent],
  templateUrl: './reset-password-layout.component.html',
  styleUrl: './reset-password-layout.component.scss'
})
export class ResetPasswordLayoutComponent {
  currentStep = signal<'forget' | 'verify' | 'set'>('forget');
  email = signal<string>('');

  onEmailSubmitted(email: string) {
    this.email.set(email);
    this.currentStep.set('verify');
  }

  onCodeVerified() {
    this.currentStep.set('set');
  }

  onPasswordReset() {
    this.email.set('');
    this.currentStep.set('forget');
  }
}
